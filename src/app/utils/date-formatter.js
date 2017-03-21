'use strict';

const getYesterdayDate = (date) => {
  date.setDate(date.getDate() - 1);
  date.setHours(0);
  date.setMinutes(0);
  date.setSeconds(0);
  return date;
};

export const dateFormatter = (date) => {
  const timeUnits = [date.getDate(), date.getMonth(), date.getFullYear()];
  return timeUnits.map(prettyTimeUnitPrint).reduce((i, j) => `${i}-${j}`);
};

const prettyTimeUnitPrint = (unit) => {
  return unit < 10 ? '0' + unit : unit;
};

export default getYesterdayDate;
