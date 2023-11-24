import {TOTAL_ANGS} from '../../constants';

export const calculateDailyAngs = (currentDate: any) => {
  const today = new Date();
  const milliseconds = currentDate.getTime() - today.getTime();
  const numberOfDays = Math.round(milliseconds / (1000 * 60 * 60 * 24));
  const dailyAngs = Math.ceil(TOTAL_ANGS / numberOfDays);
  return dailyAngs;
};

export const calculateCompletionDate = (angs: number) => {
  const today = new Date();
  const numberOfDays = Math.ceil(TOTAL_ANGS / angs);
  const completionDate = new Date(
    today.setDate(today.getDate() + numberOfDays),
  );
  return completionDate;
};

export const formatDate = (date: string | number | Date) => {
  const dateObj = new Date(date);
  let month = '' + (dateObj.getMonth() + 1);
  let day = '' + dateObj.getDate();
  const year = dateObj.getFullYear();

  if (month.length < 2) {
    month = '0' + month;
  }
  if (day.length < 2) {
    day = '0' + day;
  }

  return [year, month, day].join('-');
};
