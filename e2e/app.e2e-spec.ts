import { JBLPPage } from './app.po';

describe('jblp App', () => {
  let page: JBLPPage;

  beforeEach(() => {
    page = new JBLPPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
