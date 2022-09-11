import moment from "moment";

export function getWeekOfDayWithOffset(input = moment()) {
  const firstDayOfMonth = input.clone().startOf("month");
  const firstDayOfWeek = firstDayOfMonth.clone().startOf("week");

  const offset = firstDayOfMonth.diff(firstDayOfWeek, "days");

  return Math.ceil((input.date() + offset) / 7);
}

export function getFirstDayOfWeek(input = moment()) {
  const firstDayOfWeek = input.clone().startOf("week").toDate();
  return firstDayOfWeek;
}

export function getDayOfMonthFromDate(input = moment()) {
  const result = input.date();
  return result;
}

export function generateMondayStringFromMonth(input = moment()) {
  var days = [];
  var monday = input.clone().startOf("month").day("Monday");
  if (monday.date() > 7) monday.add(7, "d");
  var month = monday.month();
  while (month === monday.month()) {
    days.push(monday.format("Do"));
    monday.add(7, "d");
  }
  return days;
}

export function generateMondayMomentFromMonth(input) {
  var days = [];
  console.log("generateMondayMomentFromMonth::input::" + JSON.stringify(input));
  var date = moment(input, "YYYY MMM");
  console.log("generateMondayMomentFromMonth::date::" + JSON.stringify(date));
  var monday = date.startOf("month").day("Monday");
  if (monday.date() > 7) monday.add(7, "d");
  var month = monday.month();
  while (month === monday.month()) {
    days.push(monday);
    monday.add(7, "d");
  }
  return days;
}

export function generateMonthArrayFromMonth(input = moment()) {
  const days = [];
  const firstDayOfMonth = input.clone().startOf("month");
  const lastDayOfMonth = input.clone().endOf("month");
  const dateStart = firstDayOfMonth;
  const dateEnd = lastDayOfMonth;
  while (dateEnd.diff(dateStart, "days") >= 0) {
    if (dateStart.isBefore(dateEnd)) {
      const obj = { x: new Date(dateStart).getTime(), y: 0 };
      //const obj = { x: dateStart.format("YYYY-MM-DDTHH:mm:ss.SSSZ"), y: 0 };
      days.push(obj);
    }
    dateStart.add(1, "days");
  }
  return days;
}

export function generateMonthArrayList() {
  const months = [];
  const dateStart = moment().subtract(100, "month");
  const dateEnd = moment().add(100, "month");
  while (dateEnd.diff(dateStart, "months") >= 0) {
    months.push(dateStart.format("YYYY MMM"));
    dateStart.add(1, "month");
  }
  return months;
}

export function getCurrentMonthIndexFromMonthArray(array) {
  const date = moment().format("YYYY MMM");
  const index = array.findIndex((obj) => obj === date);
  return index;
}

export function findWeekInMonthArr(dateStr) {
  var index = null;
  var date = moment(dateStr, "YYYY MMM");
  // console.log("date::findWeekInMonthArr::date::" + date);
  // console.log("date::findWeekInMonthArr::month::" + month);
  // const firstDayOfMonth = month.clone().startOf("month");
  // const firstDayOfWeek = firstDayOfMonth.clone().startOf("week");

  // const offset = firstDayOfMonth.diff(firstDayOfWeek, "days");

  // index = Math.ceil((date.clone() + offset) / 7);
  // console.log("date::findWeekInMonthArr::index::" + index);
  index = date.format("w");
  return index;
}
