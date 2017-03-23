'use strict';

/* global describe */
/* global it */
/* global jest */
import chai from 'chai';
import YesterdayDateFormatter, {dateFormatter} from './date-formatter';
const expect = chai.expect;

//noinspection JSUnresolvedFunction
jest.unmock('./date-formatter');
describe('Test utils', () => {
  it('get time test', () => {
    const date = new Date();
    const day = getPrettyFormat(date.getDate());
    const month = getPrettyFormat(date.getMonth());
    const year = getPrettyFormat(date.getFullYear());
    // noinspection JSUnresolvedFunction
    expect(dateFormatter(date)).to.equal(`${day}-${month}-${year}`);
  });

  function getPrettyFormat(unit) {
    return unit < 10 ? '0' + unit : unit;
  }

  it('get since yesterday', () => {
    const date = new Date();
    const expectedDate = date.getDate() - 1;
    expect(YesterdayDateFormatter(date).getDate()).to.equal(expectedDate);
  });
});