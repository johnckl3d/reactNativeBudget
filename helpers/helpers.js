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
  const result = input.clone().date();
  return result;
}

export function generateMonthArrayFromMonth(input = moment()) {
  const days = [];
  const firstDayOfMonth = input.clone().startOf("month");
  const lastDayOfMonth = input.clone().endOf("month");
  const dateStart = firstDayOfMonth;
  const dateEnd = lastDayOfMonth;
  while (dateEnd.diff(dateStart, 'days') >= 0) {
    const obj = {'x': dateStart.format('D'), 'y':0};
   days.push(obj);
   dateStart.add(1, 'days')
  }
  return days
}
