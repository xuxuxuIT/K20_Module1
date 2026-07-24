// ham 1
function addDays(dateString, days) {
  const date = new Date(dateString);

  date.setDate(date.getDate() + days);

  return date.toISOString().split("T")[0];
}

console.log(addDays("2026-07-19", 10));
console.log(addDays("2026-07-25", 10));
console.log(addDays("2026-01-01", -5));

// ham 2
function getDaysBetween(date1String, date2String) {
  const date1 = new Date(date1String);
  const date2 = new Date(date2String);

  const diff = Math.abs(date2 - date1);

  const days = diff / (1000 * 60 * 60 * 24);

  return days;
}

console.log(getDaysBetween("2026-07-19", "2026-08-01"));

console.log(getDaysBetween("2026-01-01", "2026-12-31"));

//ham3
function isExpired(expiryDateString, currentDateString) {
  const expiryDate = new Date(expiryDateString + "T00:00:00");
  const currentDate = new Date(currentDateString + "T00:00:00");

  return currentDate > expiryDate;
}
console.log(isExpired("2026-07-01", "2026-07-19")); // true  (đã qua ngày hết hạn)
console.log(isExpired("2026-12-31", "2026-07-19")); // false (chưa tới hạn)

//ham4
function getCountdown(targetDateString, currentDateString) {
  const target = new Date(targetDateString);

  const current = new Date(currentDateString);

  const diff = target - current;

  if (diff <= 0) {
    return "Đã qua hạn";
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));

  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

  return `Còn ${days} ngày ${hours} giờ`;
}

console.log(getCountdown("2026-08-01T00:00:00", "2026-07-19T12:00:00"));

console.log(getCountdown("2026-07-01T00:00:00", "2026-07-19T12:00:00"));
