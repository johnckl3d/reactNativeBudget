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

export function getMonthIndexFromMonthArray(monthStr, array) {
  // console.log(
  //   "dates::getMonthIndexFromMonthArray::monthStr::" + JSON.stringify(monthStr)
  // );
  // console.log(
  //   "dates::getMonthIndexFromMonthArray::array::" + JSON.stringify(array)
  // );

  const index = array.findIndex((obj) => obj === monthStr);
  //console.log("dates::getMonthIndexFromMonthArray::index::" + index);

  return index;
}

export function generateAmountFromMonth(costSnapShots, monthStr) {
  console.log("==============================================");
  console.log("generateAmountFromMonth::monthStr::" + monthStr);
  var days = [];
  //console.log("generateAmountFromMonth");
  const carousellMMonth = moment(monthStr, "YYYY MMM");
  console.log(
    "generateAmountFromMonth::carousellMMonth::" +
      carousellMMonth.format("MM-YYYY")
  );
  console.log(
    "generateAmountFromMonth::carousellMMonth::month::" +
      carousellMMonth.month()
  );
  //console.log("generateAmountFromMonth::" + JSON.stringify(date));
  var carousellMFirstDay = carousellMMonth.clone(1, "DD").local();
  console.log(
    "generateAmountFromMonth::carousellMFirstDay::" +
      JSON.stringify(carousellMFirstDay)
  );
  var day = carousellMMonth.clone(1, "DD");
  while (day.month() === carousellMMonth.month()) {
    console.log("push");
    days.push(0);
    day.add(1, "d");
  }

  costSnapShots.forEach((costSnapShot) => {
    //"2021-01-15T00:00:00"
    //"2021-01-19T00:00:00"
    const dt = costSnapShot.dateTime;
    const dtt = dt.split("T")[0];
    console.log(dtt);
    const ssDate = moment(dtt, "YYYY-MM-DD").local();
    var ssMonth = ssDate.month().toString();
    console.log(
      "generateAmountFromMonth::costSnapShots::ssDate::" +
        JSON.stringify(ssDate)
    );
    console.log(
      "generateAmountFromMonth::costSnapShots::ssMonth::" +
        JSON.stringify(ssMonth)
    );
    if (ssMonth === carousellMMonth.month().toString()) {
      console.log("generateAmountFromMonth::costSnapShots::match");
      const index = ssDate.day() - 1;
      console.log(
        "generateAmountFromMonth::costSnapShots::match::" +
          JSON.stringify(ssDate.date())
      );
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
