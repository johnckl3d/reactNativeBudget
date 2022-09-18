import moment from "moment";
import { SETTINGS } from "@Constants/settings";
import { nFormatter } from "@Utils/commonUtils";

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

export function getMonthIndexFromMonthArray(monthStr, array) {
  if (!array) {
    return -1;
  }
  if (monthStr == null || monthStr == "") {
    monthStr = moment().format("YYYY MMM");
  }
  // console.log(
  //   "dates::getMonthIndexFromMonthArray::monthStr::" + JSON.stringify(monthStr)
  // );
  // console.log(
  //   "dates::getMonthIndexFromMonthArray::array::" + JSON.stringify(array)
  // );

  const index = array.findIndex((obj) => obj === monthStr);

  return index;
}

export function generateAmountFromMonth(costSnapShots, monthStr) {
  // console.log(
  //   "date::generateAmountFromMonth::costSnapShots::" +
  //     JSON.stringify(costSnapShots)
  // );
  // console.log("date::generateAmountFromMonth::monthStr::" + monthStr);
  var days = [];
  const carousellMMonth = moment(monthStr, "YYYY MMM");

  var carousellMFirstDay = carousellMMonth.clone(1, "DD").local();

  var day = carousellMMonth.clone(1, "DD");
  while (day.month() === carousellMMonth.month()) {
    days.push(0);
    day.add(1, "d");
  }

  costSnapShots.forEach((costSnapShot) => {
    //"2021-01-15T00:00:00"
    //"2021-01-19T00:00:00"
    const dt = costSnapShot.dateTime;
    const dtt = dt.split("T")[0];

    const ssDate = moment(dtt, "YYYY-MM-DD").local();
    var ssMonth = ssDate.month().toString();
    // console.log("costSnapShot::" + costSnapShot.dateTime);
    // console.log("ssDate::" + JSON.stringify(ssDate));
    // console.log("ssMonth::" + ssMonth);
    // console.log("carousellMMonth::" + carousellMMonth.month().toString());
    if (ssMonth === carousellMMonth.month().toString()) {
      const index = ssDate.date() - 1;
      // console.log("ssDate.date::" + ssDate.date());
      // console.log("index::" + index);
      days[index] += nFormatter(costSnapShot.amount);
    }
  });

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
