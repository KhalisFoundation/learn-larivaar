import {TOTAL_ANGS} from '../../constants';

export const calculateDailyAngs = (currentDate: any) => {
  const today = new Date();
  const timeDiff = currentDate.getTime() - today.getTime();
  const dayDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
  const dailyAngs = Math.round(TOTAL_ANGS / (dayDiff + 1));
  return dailyAngs;
};

export const formatDate = (date: string | number | Date) => {
  const d = new Date(date);
  let month = '' + (d.getMonth() + 1);
  let day = '' + d.getDate();
  const year = d.getFullYear();

  if (month.length < 2) {
    month = '0' + month;
  }
  if (day.length < 2) {
    day = '0' + day;
  }

  return [year, month, day].join('-');
};
