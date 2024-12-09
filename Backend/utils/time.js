export const millisecondsPerDay = 24 * 60 * 60 * 1000;

function convertDateObjectToDateString(date) {
  return date.toISOString().slice(0, 19).replace("T", " ");
}

export function getTime() {
  const currentDate = new Date();

  return convertDateObjectToDateString(currentDate);
}

export function getDayAfterToday() {
  const currentDate = new Date();

  return convertDateObjectToDateString(
    new Date(currentDate.getTime() + millisecondsPerDay)
  );
}

export function getWeekAfterToday() {
  const currentDate = new Date();

  return convertDateObjectToDateString(
    new Date(currentDate.getTime() + 7 * millisecondsPerDay)
  );
}

export function getDayAfterDate(date) {
  const currentDate = new Date();

  return convertDateObjectToDateString(
    new Date(new Date(date).getTime() + millisecondsPerDay)
  );
}

export function getWeekAfterDate(date) {
  const currentDate = new Date();

  return convertDateObjectToDateString(
    new Date(new Date(date).getTime() + 7 * millisecondsPerDay)
  );
}

export function getFirstDayOfMonthToday() {
  const currentDate = new Date();

  return convertDateObjectToDateString(
    new Date(currentDate.getFullYear(), currentDate.getMonth(), 1)
  );
}

export function getFirstDayOfMonthDate(date) {
  return convertDateObjectToDateString(
    new Date(date.getFullYear(), date.getMonth(), 1)
  );
}
