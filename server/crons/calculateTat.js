#!/usr/bin/env node
const debug = require('debug');
const program = require('commander');
const bluebird = require('bluebird');
const rp = require('request-promise');
const WorkingDays = require('moment-working-days');

const logger = require('../components/logger');
const {
  GRONIT_URL, CALCULATE_TAT_GRONIT_ID, NODE_ENV,
  TAT_HOLIDAYS,
} = require('../config/environment');
const {
  Case, CaseState,
} = require('../conn/sqldb');

const log = (...args) => {
  logger.debug(args.join(' '));
  debug('cron:extension: CalculateTat')(...args);
};

const momentWorkingdays = new WorkingDays({
  includeToday: false,
  verbose: false,
  weekOffDays: [0, 6],
  dateFormat: 'DD-MM-YYYY',
  customHolidays: TAT_HOLIDAYS ? TAT_HOLIDAYS.split(',') : [],
  customWorkingDays: [],
});

module.exports = class CalculateTat {
  constructor() {
    this.init();
    this.parallel = +this.program.parallel || 5;
  }

  init() {
    this.program = program;

    program
      .version('1.0.0')
      .option('-p, --parallel <d>', 'Number of parallel processes')
      .parse(process.argv);
  }

  async main() {
    try {
      if (NODE_ENV !== 'development') {
        await rp.get(`${GRONIT_URL}/run/${CALCULATE_TAT_GRONIT_ID}`);
      }
    } catch (err) {
      logger.error('Gronit error: ', err);
    }

    try {
      const allCases = await Case.findAll({
        attributes: ['id'],
        include: [{
          model: CaseState,
          attributes: ['id', 'tat_action', 'created_on'],
          where: {
            tat_action: { $ne: null },
          },
          required: true,
          order: [['id', 'ASC']],
        }],
      });

      await bluebird.map(allCases, async (caseData) => {
        const { id, CaseStates: caseStates } = caseData;

        const tatDays = momentWorkingdays.getWorkingDays(caseStates.map(cs => cs.created_on)) || 1;

        return Case.update({
          tat: tatDays,
        }, {
          where: {
            id,
          },
          silent: true,
        });
      }, { concurrency: this.parallel });

      log('TAT calculation completed successfully');
    } catch (err) {
      log('TAT calculation failed: ', err);
    } finally {
      if (NODE_ENV !== 'development') {
        await rp.get(`${GRONIT_URL}/complete/${CALCULATE_TAT_GRONIT_ID}`);
      }
    }

    return true;
  }
};
