export const isFutureDate = (inputDate: string): boolean => {
  const currentDate = new Date();
  const selectedDate = new Date(inputDate);

  // Year
  if (selectedDate.getFullYear() < currentDate.getFullYear()) return false;
  if (selectedDate.getFullYear() > currentDate.getFullYear()) return true;

  // Month
  if (selectedDate.getMonth() < currentDate.getMonth()) return false;
  if (selectedDate.getMonth() > currentDate.getMonth()) return true;

  // Day of month
  return selectedDate.getDate() >= currentDate.getDate();
};

export const getDateAndTime = (
  date: string,
  time: string
): { year: number; month: number; day: number; hour: number; minute: number; second: number } => {
  const dateStrings = date.split("-");
  const timeStrings = time.split(":");
  const year = parseInt(dateStrings[0]);
  const month = parseInt(dateStrings[1]) - 1;
  const day = parseInt(dateStrings[2]);
  const hour = parseInt(timeStrings[0]);
  const minute = parseInt(timeStrings[1]);
  const second = parseInt(timeStrings[2]);
  return { year, month, day, hour, minute, second };
};

export const getTimeEnd = ({
  year,
  month,
  day,
  hour,
  minute,
  second,
  duration
}: {
  year: number;
  month: number;
  day: number;
  hour: number;
  minute: number;
  second: number;
  duration: string;
}) => {
  switch (duration) {
    case "30 phút":
      return new Date(year, month, day, hour, minute + 30, second);
    case "1 giờ":
      return new Date(year, month, day, hour + 1, minute, second);
    case "1 giờ 30 phút":
      return new Date(year, month, day, hour + 1, minute + 30, second);
    case "2 giờ":
      return new Date(year, month, day, hour + 2, minute, second);
    case "2 giờ 30 phút":
      return new Date(year, month, day, hour + 2, minute + 30, second);
    case "3 giờ":
      return new Date(year, month, day, hour + 3, minute, second);
    case "3 giờ 30 phút":
      return new Date(year, month, day, hour + 3, minute + 30, second);
    case "4 giờ":
      return new Date(year, month, day, hour + 4, minute, second);
    case "4 giờ 30 phút":
      return new Date(year, month, day, hour + 4, minute + 30, second);
    case "5 giờ":
      return new Date(year, month, day, hour + 5, minute, second);
    case "5 giờ 30 phút":
      return new Date(year, month, day, hour + 5, minute + 30, second);
    default:
      return new Date();
  }
};
