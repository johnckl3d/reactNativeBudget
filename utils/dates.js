import moment from "moment";
import { SETTINGS } from "@Constants/settings";

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

export function getCurrentMonthIndexFromMonthArray(array) {
  const date = moment().format("YYYY MMM");
  const index = array.findIndex((obj) => obj === date);
  return index;
}

export function generateAmountFromMonth(costSnapShots, monthStr) {
  //console.log("convertCostSnapShotsToWeekAmount::" + weekArr);
  var days = [];
  //console.log("generateAmountFromMonth");
  const date = moment(monthStr, "YYYY MMM");
  //console.log("generateAmountFromMonth::" + JSON.stringify(date));
  var day = date.startOf("month");
  var month = day.month();
  while (month === day.month()) {
    days.push(0);
    day.add(1, "d");
  }

  costSnapShots.forEach((costSnapShot) => {
    //"2021-01-15T00:00:00"
    //"2021-01-19T00:00:00"
    const dt = costSnapShot.dateTime;
    // console.log(
    //   "generateAmountFromMonth::costSnapShots::ssDate-1::" +
    //     JSON.stringify(moment(dt, "yyyy-MM-dd'T'HH:mm:ss", true).isValid())
    // );
    const dtt = dt.split("T")[0];
    console.log(dtt);
    const ssDate = moment(dtt, "YYYY-MM-DD");
    var ssDay = ssDate.clone().startOf("month");
    var ssMonth = ssDay.month();
    console.log(
      "generateAmountFromMonth::costSnapShots::ssDate::" +
        JSON.stringify(ssDate)
    );
    console.log(
      "generateAmountFromMonth::costSnapShots::ssDay::" + JSON.stringify(ssDay)
    );
    console.log(
      "generateAmountFromMonth::costSnapShots::ssMonth::" +
        JSON.stringify(ssMonth)
    );
    console.log(
      "generateAmountFromMonth::costSnapShots::Month::" + JSON.stringify(month)
    );
    if (ssMonth === month) {
      console.log("generateAmountFromMonth::costSnapShots::match");
      const index = ssDate.day() - 1;
      days[index] += costSnapShot.amount;
    }
  });

  return days;
}

export function generateMondayStringFromMonth(monthStr) {
  var days = [];
  const date = moment(monthStr, "YYYY MMM");
  //console.log(JSON.stringify(date));
  var day = date.startOf("month");
  var month = day.month();
  while (month === day.month()) {
    //console.log(day.format("dddd"));
    if (day.format("dddd") === "Monday") {
      days.push(day.clone().format("DD-MM"));
    } else {
      days.push("");
    }
    day.add(1, "d");
  }
  return days;
}
