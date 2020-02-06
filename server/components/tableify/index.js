const fs = require('fs');
const path = require('path');
const moment = require('moment');
const docx = require('docx');
const Minio = require('../../components/minio');
const { root, CHECK_SEQUENCE } = require('../../config/environment');
const {
  Packer, Paragraph, Table, WidthType, Footer, PageBorderOffsetFrom,
  TextRun, HeadingLevel, BorderStyle, AlignmentType, Media, Header, PageBorderDisplay,
} = docx;

function isValidDate(date) {
  const regExp = new RegExp(
    // eslint-disable-next-line max-len
    '^(-?(?:[1-9][0-9]*)?[0-9]{4})-(1[0-2]|0[1-9])-(3[01]|0[1-9]|[12][0-9])T(2[0-3]|[01][0-9]):([0-5][0-9]):([0-5][0-9])(.[0-9]+)?(Z)?$'
  );

  return regExp.test(date);
}

function toDate(date, format = 'DD-MM-YYYY') {
  return moment(new Date(date)).format(format);
}

const capitalize = (s) => {
  if (typeof s !== 'string') return '';
  return s.charAt(0).toUpperCase() + s.slice(1);
};

function convert(key) {
  return capitalize(key.replace(/([a-z])([A-Z])/g, '$1 $2'));
}

const tableify = (obj, columns, parentsTmp) => {
  const buf = [];
  const type = typeof obj;
  let cols;

  const parents = parentsTmp || [];

  if (!(type !== 'object' || obj == null || obj === undefined)) {
    if (~parents.indexOf(obj)) {
      return '[Circular]';
    }

    parents.push(obj);
  }

  if (Array.isArray(obj)) {
    if (Array.isArray(obj[0]) && obj.every(Array.isArray)) { // array of array
      buf.push('<table>', '<tbody>');
      cols = [];

      obj.forEach((row, ix) => {
        cols.push(ix);
        row.forEach((val) => {
          buf.push('<tr><td>', tableify(val, cols, parents), '</td></tr>');
        });
      });
      buf.push('</tbody>', '</table>');
    } else if (typeof obj[0] === 'object') { // array of objects
      const tmpBuf = [];
      let isNodeEmpty = true;
      tmpBuf.push('<table>', '<tbody>');
      tmpBuf.push('<tr><td>');

      obj.forEach((o, i) => {
        if (typeof o === 'object' && !Array.isArray(o)) {
          if (i && !isNodeEmpty) tmpBuf.push('<hr/>');

          tmpBuf.push('<table>');
          Object.keys(o)
            .filter(x => (!['attachmentIds', 'attachments'].includes(x)))
            .forEach((k) => {
              const val = o[k];

              if (val) {
                isNodeEmpty = false;
                tmpBuf.push("<tr><th style='width: 20%;'>", convert(k), '</th>');
                tmpBuf.push(
                  '<td>',
                  isValidDate(val) ? toDate(val) : tableify(val, cols, parents),
                  '</td></tr>'
                );
              }
            });
          tmpBuf.push('</table>');
        }
      });

      tmpBuf.push('</td></tr>', '</tbody></table>');

      if (!isNodeEmpty) {
        buf.push(...tmpBuf);
      }
    } else { // array of primitives
      buf.push('<table>', '<tbody>');
      cols = [];

      obj.forEach((val, ix) => {
        cols.push(ix);
        buf.push('<tr>', '<td>', tableify(val, cols, parents), '</td>', '</tr>');
      });

      buf.push('</tbody>', '</table>');
    }
  } else if (
    obj && typeof obj === 'object' && !Array.isArray(obj) && !(obj instanceof Date)
  ) { // object
    const tmpBuf = [];
    let isNodeEmpty = true;

    if (!columns) {
      tmpBuf.push('<table>');

      const keys = Object.keys(obj)
        .filter(x => (!['attachmentIds', 'attachments'].includes(x)));

      for (let key of keys) {
        const x = tableify(obj[key], false, parents);

        if (x) {
          isNodeEmpty = false;

          if ([
            'basicDetails', 'addressDetails',
            'educationDetails', 'employmentDetails',
          ].includes(key)) {
            tmpBuf.push(
              "<tr class='allow-break'>",
              "<tr><th class='thead'>", convert(key), '</th></tr>',
              '<td>', x, '</td>',
              '</tr>',
            );
          } else {
            if (key === 'fullName') {
              key = 'Full Name (As per PAN/ Aadhaar Card)';
            } else if (key === 'lastName') {
              key = "Father/ Husband's Name (As per PAN/ Aadhaar Card)";
            }

            tmpBuf.push(
              "<tr class='no-break'><th style='width: 20%;'>",
              convert(key),
              '</th><td>', x, '</td></tr>',
            );
          }
        }
      }

      tmpBuf.push('</table>');

      if (!isNodeEmpty) {
        buf.push(...tmpBuf);
      }
    } else {
      columns.forEach((key) => {
        if (typeof obj[key] === 'object' && !Array.isArray(obj[key])) {
          buf.push('<td>', tableify(obj[key], false, parents), '</td>');
        } else {
          buf.push('<td>', tableify(obj[key], columns, parents), '</td>');
        }
      });
    }
  } else if (isValidDate(obj)) {
    buf.push(toDate(obj));
  } else {
    buf.push(obj);
  }

  if (!(type !== 'object' || obj == null || obj === undefined)) {
    parents.pop(obj);
  }

  return buf.join('');
};

class SubCaseTableify {
  constructor(isAttachmentLinks) {
    this.attachmentIds = [];
    this.isAttachmentLinks = isAttachmentLinks;
  }

  subCaseTableify(obj, columns, parentsTmp) {
    const buf = [];
    const type = typeof obj;
    let cols;

    const parents = parentsTmp || [];

    if (!(type !== 'object' || obj == null || obj === undefined)) {
      if (~parents.indexOf(obj)) {
        return '[Circular]';
      }

      parents.push(obj);
    }

    if (Array.isArray(obj)) {
      if (Array.isArray(obj[0]) && obj.every(Array.isArray)) { // array of array
        buf.push('<table>', '<tbody>');
        cols = [];

        obj.forEach((row, ix) => {
          cols.push(ix);

          row.forEach((val) => {
            buf.push('<tr><td>', this.subCaseTableify(val, cols, parents), '</td></tr>');
          });
        });

        buf.push('</tbody>', '</table>');
      } else if (typeof obj[0] === 'object') { // array of objects
        const tmpBuf = [];
        let isNodeEmpty = true;
        tmpBuf.push('<table>', '<tbody>');
        tmpBuf.push('<tr><td>');

        obj.forEach((o, i) => {
          if (typeof o === 'object' && !Array.isArray(o)) {
            if (i && !isNodeEmpty) tmpBuf.push('<hr/>');

            tmpBuf.push('<table>');
            Object.keys(o)
            .filter(x => (!['attachmentIds'].includes(x)))
              .forEach((k) => {
                const val = o[k];

                if (val) {
                  isNodeEmpty = false;
                  tmpBuf.push('<tr><th>', convert(k), '</th>');
                  tmpBuf.push(
                    '<td>',
                    isValidDate(val) ? toDate(val) : tableify(val, cols, parents),
                    '</td></tr>'
                  );
                }
              });
            tmpBuf.push('</table>');
          }
        });

        tmpBuf.push('</td></tr>', '</tbody></table>');

        if (!isNodeEmpty) {
          buf.push(...tmpBuf);
        }
      } else { // array of primitives
        buf.push('<table>', '<tbody>');
        cols = [];

        obj.forEach((val, ix) => {
          cols.push(ix);
          buf.push('<tr>', '<td>', this.subCaseTableify(val, cols, parents), '</td>', '</tr>');
        });

        buf.push('</tbody>', '</table>');
      }
    } else if (
      obj && typeof obj === 'object' && !Array.isArray(obj) && !(obj instanceof Date)
    ) { // object
      const tmpBuf = [];
      let isNodeEmpty = true;

      if (!columns) {
        tmpBuf.push('<table>');

        if (obj.type === 'file') {
          isNodeEmpty = false;
          let files = obj.value;

          if (!Array.isArray(files)) {
            files = [files];
          }

          tmpBuf.push('<td><table>');

          for (const { id: fileId, filename } of files) {
            this.attachmentIds.push(fileId);

            tmpBuf.push('<tr><td>');

            if (this.isAttachmentLinks) {
              tmpBuf.push(`<a onclick='${fileId}' target='_blank'>${filename}</a>`);
            } else {
              tmpBuf.push(filename);
            }

            tmpBuf.push('</td></tr>');
          }

          tmpBuf.push('</table></td>');
        } else {
          const keys = Object.keys(obj)
          .filter(x => (!['attachmentIds'].includes(x)));

          for (const key of keys) {
            if (key === 'attachments') {
              isNodeEmpty = false;
              const files = obj[key];

              tmpBuf.push(
                "<tr class='no-break'><th>",
                convert(key),
                '</th>',
                '<td><table>'
              );

              for (const { file: { id: fileId, filename } } of files) {
                this.attachmentIds.push(fileId);

                tmpBuf.push('<tr><td>');

                if (this.isAttachmentLinks) {
                  tmpBuf.push(
                    `<a onclick='${fileId}' target=_blank'>${filename}</a>`,
                  );
                } else {
                  tmpBuf.push(filename);
                }

                tmpBuf.push('</td></tr>');
              }

              tmpBuf.push('</table></td></tr>');
            } else {
              const x = this.subCaseTableify(obj[key], false, parents);

              if (x) {
                isNodeEmpty = false;

                tmpBuf.push(
                  "<tr class='no-break'><th>",
                  convert(key),
                  '</th><td>', x, '</td></tr>',
                );
              }
            }
          }
        }

        tmpBuf.push('</table>');

        if (!isNodeEmpty) {
          buf.push(...tmpBuf);
        }
      } else {
        columns.forEach((key) => {
          if (typeof obj[key] === 'object' && !Array.isArray(obj[key])) {
            buf.push('<td>', this.subCaseTableify(obj[key], false, parents), '</td>');
          } else {
            buf.push('<td>', this.subCaseTableify(obj[key], columns, parents), '</td>');
          }
        });
      }
    } else if (isValidDate(obj)) {
      buf.push(toDate(obj));
    } else {
      buf.push(obj);
    }

    if (!(type !== 'object' || obj == null || obj === undefined)) {
      parents.pop(obj);
    }

    return buf.join('');
  }

  tableify(obj) {
    const html = this.subCaseTableify(obj);

    return {
      html,
      attachmentIds: this.attachmentIds,
    };
  }
}

const addCell = (table, row, column, text, options = {}) => {
  const {
    fontSize = 24,
    heading,
    allCaps,
    bold,
    fill,
    color = '000000',
    alignment,
    highlight,
  } = options;

  const cell = table.getCell(row, column);

  cell
    .add(new Paragraph({
      children: [
        new TextRun({
          text: text || '',
          size: fontSize,
          color,
          font: {
            name: 'Calibri',
          },
          allCaps,
          bold,
          highlight,
        }),
      ],
      heading,
      alignment,
    }))
    .setShading({
      fill: fill || ((row % 2) ? 'acc0e1' : 'd6e0ef'),
    })
    .setMargins({
      top: 100,
      bottom: 100,
      left: 250,
      right: 250,
    })
    .Borders
    .addTopBorder(BorderStyle.THREE_D_EMBOSS, 1, 'd6e0ef')
    .addBottomBorder(BorderStyle.THREE_D_EMBOSS, 1, 'd6e0ef')
    .addLeftBorder(BorderStyle.THREE_D_EMBOSS, 1, 'd6e0ef')
    .addRightBorder(BorderStyle.THREE_D_EMBOSS, 1, 'd6e0ef');

  return cell;
};

const statusColor = (status) => {
  switch (status) {
    case 'Positive': return 'green';
    case 'Negative': return 'red';
    case 'Discrepant': return 'darkYellow';
    default: return 'yellow';
  }
};

const createDoc = async (data, filePath) => {
  const {
    caseData,
    subCaseResponses,
  } = data;

  let { CaseChecks: caseChecks } = caseData;

  const doc = new docx.Document();
  const children = [];

  // candidate details
  const candidateTable = new Table({
    rows: 5,
    columns: 2,
    widthUnitType: WidthType.AUTO,
    columnWidths: [4500, 4500],
  });

  children.push(candidateTable);
  let candidateIndex = 0;

  addCell(candidateTable, candidateIndex, 0,
    `${caseData.Creator.Client.name} VERIFICATION REPORT: ${
      caseData.full_name}`.toUpperCase(),
    {
      heading: HeadingLevel.HEADING_2,
      allCaps: true,
      bold: true,
      alignment: AlignmentType.CENTER,
      fill: '5981c2',
      color: 'FFFFFF',
    },
  );

  candidateTable.getRow(candidateIndex).mergeCells(0, 1);
  candidateIndex = candidateIndex + 1;

  addCell(candidateTable, candidateIndex, 0, 'Name of Subject: ', {
    bold: true,
  });
  addCell(candidateTable, candidateIndex, 0, caseData.full_name
  );

  addCell(candidateTable, candidateIndex, 1, 'Name of Client: ', {
    bold: true,
  });

  addCell(candidateTable, candidateIndex, 1,
    caseData.Creator.Client.name
  );

  candidateIndex = candidateIndex + 1;

  addCell(candidateTable, candidateIndex, 0, 'Date of Initiation: ', {
    bold: true,
  });

  if (caseData.InitDate.length) {
    addCell(candidateTable, candidateIndex, 0,
      moment(caseData.InitDate[0].created_on).format('Do MMMM, YYYY')
    );
  }

  addCell(candidateTable, candidateIndex, 1, 'Final Date of Initiation: ', {
    bold: true,
  });

  if (caseData.FinalInitDate.length) {
    addCell(candidateTable, candidateIndex, 1,
      moment(caseData.FinalInitDate[0].created_on).format('Do MMMM, YYYY')
    );
  }

  candidateIndex = candidateIndex + 1;

  addCell(candidateTable, candidateIndex, 0, 'Date of Birth: ', {
    bold: true,
  });

  if (caseData.CaseResponse) {
    addCell(candidateTable, candidateIndex, 0,
      moment(caseData.CaseResponse.dataValues.DOB).format('Do MMMM, YYYY')
    );
  }

  addCell(candidateTable, candidateIndex, 1, 'Date of Completion: ', {
    bold: true,
  });

  addCell(candidateTable, candidateIndex, 1,
    moment().format('Do MMMM, YYYY')
  );

  candidateIndex = candidateIndex + 1;

  addCell(candidateTable, candidateIndex, 0, 'Report Type: ', {
    bold: true,
  });

  addCell(candidateTable, candidateIndex, 1, 'Days in Process: ', {
    bold: true,
  });

  addCell(candidateTable, candidateIndex, 1,
    `${caseData.tat ? (caseData.tat + 1) : ' '} working day(s)`
  );

  candidateIndex = candidateIndex + 1;

  children.push(new Paragraph(''));

  // summary
  const summaryTable = new Table({
    rows: (caseChecks.length || 1) + 1,
    columns: 2,
    widthUnitType: WidthType.AUTO,
    columnWidths: [4500, 4500],
  });

  children.push(summaryTable);

  let summaryIndex = 0;

  addCell(summaryTable, summaryIndex, 0, 'Summary', {
    heading: HeadingLevel.HEADING_2,
    allCaps: true,
    bold: true,
    alignment: AlignmentType.CENTER,
    fill: '5981c2',
    color: 'FFFFFF',
  });

  summaryTable.getRow(summaryIndex).mergeCells(0, 1);

  summaryIndex = summaryIndex + 1;

  const checkStatusMap = {};

  if (caseChecks.length) {
    caseChecks = CHECK_SEQUENCE.split(',').reduce((acc, chq) => {
      const cq = caseChecks.find(cChq => (
        (
          cChq.check
          .replace('Check', '')
          .replace(/([A-Z])/g, ' $1')
          .trim()
          .replace(/(?:^|\s)\S/g, a => a.toUpperCase())) === chq
      ));
      return cq ? acc.concat(cq)
        : acc;
    }, []);

    for (const { check, status } of caseChecks) {
      const checkTmp = check
        .replace('employmentReferenceCheck', 'referenceCheck')
        .replace(/([A-Z])/g, ' $1').trim()
        .replace(/(?:^|\s)\S/g, a => a.toUpperCase());

      checkStatusMap[checkTmp.replace(' Check', '')] = status;
      addCell(
        summaryTable, summaryIndex, 0, checkTmp,
        { bold: true },
      );
      addCell(summaryTable, summaryIndex, 1, status, {
        highlight: statusColor(status),
      });
      summaryTable.getRow(summaryIndex).setCantSplit();
      summaryIndex = summaryIndex + 1;
    }
  } else {
    addCell(summaryTable, summaryIndex, 0, '', { bold: true });
    addCell(summaryTable, summaryIndex, 1, '');
    summaryIndex = summaryIndex + 1;
  }

  // subcase
  const attachmentMap = {};

  const checkTemplateMap = subCaseResponses.reduce((response, item) => {
    const attachs = item.SubCaseResponseAttachments;
    if (attachs.length) {
      attachs.forEach(a => Object.assign(attachmentMap, { [a.id]: a.path }));
    }

    if (!Array.isArray(item.response)) return response;

    const { check_type: checkType, order } = item.SubCase.SubCaseTemplate;

    return Object.assign(response, {
      [checkType]: (response[checkType] || [])
        .concat({
          order,
          fields: item.response
            .reduce((acc, s) => (
              Object.assign(acc, { [s.name]: s.model })
            ), {}),
        }).sort((a, b) => a.order - b.order),
    });
  }, {});

  for (const [templateIndex, check] of CHECK_SEQUENCE.split(',').entries()) {
    const responses = checkTemplateMap[check];
    if (!responses) continue;

    if (templateIndex) {
      children.push(new Paragraph(''));
    }

    const rows = responses.reduce((acc, { fields }) => acc + Object.keys(fields).length, 0)
      + (2 * responses.length);

    const table = new Table({
      rows,
      columns: 2,
      widthUnitType: WidthType.AUTO,
      columnWidths: [3000, 6000],
    });

    children.push(table);
    let index = 0;

    addCell(table, index, 0, check, {
      heading: HeadingLevel.HEADING_2,
      allCaps: true,
      bold: true,
      alignment: AlignmentType.CENTER,
      fill: '5981c2',
      color: 'FFFFFF',
    });

    table.getRow(index).mergeCells(0, 1);
    table.getRow(index).setCantSplit();
    index += 1;

    for (const [i, { fields }] of responses.entries()) {
      if (i) {
        addCell(table, index, 0, '', { fill: 'FFFFFF' });
        table.getRow(index).mergeCells(0, 1);
        index += 1;
      }

      const status = checkStatusMap[check];
      addCell(table, index, 0, 'Verification Status');

      addCell(table, index, 1, status, {
        highlight: statusColor(status),
      });
      index += 1;

      for (const [key, value] of Object.entries(fields)) {
        addCell(table, index, 0, key, { bold: value === 'section' });

        if (value === 'section') {
          table.getRow(index).mergeCells(0, 1);
        } else if (value && (Array.isArray(value) || value.filename)) {
          const attachments = Array.isArray(value) ? value : [value];

          for (const attach of attachments) {
            const minioLink = await Minio.viewLink({ object: attachmentMap[attach.id] });

            addCell(table, index, 1, minioLink);
          }
        } else {
          addCell(table, index, 1, isValidDate(value) ? toDate(value) : value);
        }

        table.getRow(index).setCantSplit();
        index += 1;
      }
    }
  }

  const logo = Media.addImage(
    doc,
    fs.readFileSync(path.join(
      root, 'server', 'components', 'images', 'logo.png',
    )),
    168, 45,
  );

  doc.addSection({
    headers: {
      default: new Header({
        children: [
          new Paragraph(logo),
        ],
      }),
    },
    footers: {
      default: new Footer({
        children: [
          new Paragraph({
            children: [
              new TextRun({
                text: `202 A Wing , Kailas Industrial Complex, Park Site, Vikhroli (West)
, Mumbai-400079 Ph: 022-2518-6445`,
                size: 16,
                font: {
                  name: 'Calibri',
                },
              }),
            ],
            alignment: AlignmentType.CENTER,
            border: {
              top: {
                space: 3,
                value: 'single',
              },
            },
          }),
        ],
      }),
    },
    properties: {
      pageBorders: {
        offsetFrom: PageBorderOffsetFrom.PAGE,
        display: PageBorderDisplay.ALL_PAGES,
      },
      pageBorderTop: {
        style: BorderStyle.DOUBLE,
        size: 20,
        color: '223344',
        space: 20,
      },
      pageBorderRight: {
        style: BorderStyle.DOUBLE,
        size: 20,
        color: '223344',
        space: 20,
      },
      pageBorderBottom: {
        style: BorderStyle.DOUBLE,
        size: 20,
        color: '223344',
        space: 20,
      },
      pageBorderLeft: {
        style: BorderStyle.DOUBLE,
        size: 20,
        color: '223344',
        space: 20,
      },
    },
    children,
  });

  const buffer = await Packer.toBuffer(doc);

  await Minio.bufferUpload({
    object: filePath,
    buffer: Buffer.from(buffer),
  });
};

module.exports = {
  tableify,
  SubCaseTableify,
  createDoc,
};
