// ham 1
function formatBirthday(dateString) {
  const [year, month, day] = dateString.split("-");

  return `${day}/${month}/${year}`;
}

console.log(formatBirthday("1995-03-25"));
console.log(formatBirthday("2000-12-01"));

// ham2
function getAge(birthDateString, currentDateString) {
  const [birthYear, birthMonth, birthDay] = birthDateString.split("-");
  const [currentYear, currentMonth, currentDay] = currentDateString.split("-");

  let age = currentYear - birthYear;
  if (
    currentMonth < birthMonth ||
    (currentMonth == birthMonth && currentDsy < birthDay)
  ) {
    age--;
  }
  return age;
}

console.log(getAge("1995-03-25", "2026-07-19"));
console.log(getAge("2000-12-01", "2026-07-19"));
console.log(getAge("1995-08-01", "2026-07-19"));

//ham 3
function getDayOfWeekName(dateString) {
  const date = new Date(dateString);

  const days = [
    "Chủ nhật",
    "Thứ hai",
    "Thứ ba",
    "Thứ tư",
    "Thứ năm",
    "Thứ sáu",
    "Thứ bảy",
  ];

  return days[date.getDay()];
}

console.log(getDayOfWeekName("2026-07-19"));
console.log(getDayOfWeekName("2000-01-01"));
