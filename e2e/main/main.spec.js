

const config = browser.params;

describe('Main View', () => {
  let page;

  beforeEach(() => {
    const promise = browser.get(`${config.baseUrl}/`);
    page = require('./main.po');
    return promise;
  });

  it('should include jumbotron with correct data', () => {
    expect(page.h1El.getText()).to.eventually.equal('\'Allo, \'Allo!');
    expect(page.imgEl.getAttribute('src')).to.eventually.match(/yeoman(\.[a-zA-Z0-9]*)?\.png$/);
    expect(page.imgEl.getAttribute('alt')).to.eventually.equal('I\'m Yeoman');
  });
});
