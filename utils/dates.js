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

export function generateWeekArrayFromMonth(input = moment()) {
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
