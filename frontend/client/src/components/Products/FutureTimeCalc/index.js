import dayjs from 'dayjs';

function getRemainingSeconds(nowDayjs, futureDayjs){
 const seconds = futureDayjs.diff(nowDayjs, 'seconds') % 60;
 return seconds;
}

function getRemainingMinutes(nowDayjs, futureDayjs){
 const minutes = futureDayjs.diff(nowDayjs, 'minutes') % 60;
 return minutes;
}

function getRemainingHours(nowDayjs, futureDayjs){
  const hours = futureDayjs.diff(nowDayjs, 'hours') % 24;
  return hours;
 }

 function getRemainingDays(nowDayjs, futureDayjs){
  const days = futureDayjs.diff(nowDayjs, 'days');
  return days.toString();
 }

 function padWithZeros(num, minLength) {
   const numString = num.toString();
   if (numString.length >= minLength) return numString;
   return "0".repeat(minLength - numString.length) + numString;
 }

const FutureTimeCalc = (startTime, endTime) => {
  const futureDayjs = dayjs(new Date(endTime).getTime());
  const nowDayjs = dayjs(new Date().getTime());
  if(futureDayjs.isBefore(nowDayjs)) {
    return {
      days: '00',
      hours: '00',
      minutes: '00',
      seconds: '00'
    }
  }

  let time = {
    days: getRemainingDays(nowDayjs, futureDayjs).padStart(2, '0'),
    hours: padWithZeros(getRemainingHours(nowDayjs, futureDayjs), 2),
    minutes: padWithZeros(getRemainingMinutes(nowDayjs, futureDayjs), 2),
    seconds: padWithZeros(getRemainingSeconds(nowDayjs, futureDayjs), 2)
  }
  return time;
};

export default FutureTimeCalc;
