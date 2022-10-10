import moment from "moment";
import { SETTINGS } from "@Constants/settings";
import { nFormatter } from "@Utils/commonUtils";

export function formatDate(input = moment(), format) {
  const result = moment(input).format(format);
  return result;
}

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

export function generateMonthRange() {
  const months = [];
  const dateStart = moment().subtract(SETTINGS.BUDGET_MONTH_RANGE, "month");
  const dateEnd = moment().add(SETTINGS.BUDGET_MONTH_RANGE, "month");
  while (dateEnd.diff(dateStart, "months") >= 0) {
    months.push(dateStart.format("YYYY MMM"));
    dateStart.add(1, "month");
  }
  return months;
}

export function getMinimumMonth() {
  const monthRange = generateMonthRange();
  //console.log("getMinimumMonth::monthRange::" + JSON.stringify(monthRange));
  var result = moment(monthRange[0]).toDate();
  //console.log("getMinimumMonth::result::" + JSON.stringify(result));
  return result;
}

export function getMaximumMonth() {
  const monthRange = generateMonthRange();
  var max = monthRange.length;
  //console.log("getMinimumMonth::monthRange::" + JSON.stringify(monthRange));
  var result = moment(monthRange[max - 1]).toDate();
  //console.log("getMinimumMonth::result::" + JSON.stringify(result));
  return result;
}

export function getMonthIndexFromMonthArray(monthStr, array) {
  if (!array) {
    return -1;
  }
  if (monthStr == null || monthStr == "") {
    monthStr = moment().format("YYYY MMM");
  }
  const index = array.findIndex((obj) => obj === monthStr);

  return index;
}

export function generateAmountFromMonth(costSnapShots, monthStr) {
  var days = [];
  const carousellMMonth = moment(monthStr, "YYYY MMM");
  var day = carousellMMonth.clone(1, "DD");
  while (day.month() === carousellMMonth.month()) {
    days.push(0);
    day.add(1, "d");
  }

  costSnapShots.forEach((costSnapShot) => {
    //"2021-01-15T00:00:00"
    //"2021-01-19T00:00:00"
    const dt = costSnapShot.dateTime;
    //console.log("generateAmountFromMonth::dt::" + JSON.stringify(dt));
    const dtt = dt.split("T")[0];
    //console.log("generateAmountFromMonth::dtt::" + JSON.stringify(dtt));
    const ssDate = moment(dtt, "YYYY-MM-DD").local();
    //console.log("generateAmountFromMonth::ssDate::" + JSON.stringify(ssDate));
    var ssMonth = ssDate.month().toString();
    var ssYear = ssDate.year().toString();
    //console.log("generateAmountFromMonth::ssMonth::" + JSON.stringify(ssMonth));
    if (
      ssMonth === carousellMMonth.month().toString() &&
      ssYear === carousellMMonth.year().toString()
    ) {
      const index = ssDate.date() - 1;
      days[index] += costSnapShot.amount;
      console.log("generateAmountFromMonth::days[index]::" + days[index]);
    }
  });
  //console.log("generateAmountFromMonth::days::" + JSON.stringify(days));
  return days;
}

export function generateMondayStringFromMonth(monthStr) {
  var days = [];
  const date = moment(monthStr, "YYYY MMM");
  var day = date.startOf("month");
  var month = day.month();
  while (month === day.month()) {
    if (day.format("dddd") === "Monday") {
      days.push(day.clone().format("DD-MM"));
    } else {
      days.push("");
    }
    day.add(1, "d");
  }
  return days;
}
