export const pad = (num, places) => String(num).padStart(places, '0');
const firstDayOfWeek = (date) => date.setDate(date.getDate() - date.getDay());
const firstDayOfMonth = (date) => date.setDate(1);

export const wkdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export const dlinefromfloat = (dlineValue, periodicity) => {
  switch (+periodicity) {
    case 1:
      let d = new Date();
      d.setHours(0);
      d.setMinutes(24 * dlineValue * 60);
      return `${pad(d.getHours(), 2)}:${pad(d.getMinutes(), 2)}`;

    case 7:
      return wkdays[dlineValue - 1];

    case 30:
      return (+dlineValue).toFixed(0);

    default:
      return '00:00';
  }
};

export const dlineToFloat = (hh, mm) => {
  let gotMinutes = hh * 60 + mm;
  let dayTotalMinutes = 24 * 60;
  let result = gotMinutes / dayTotalMinutes;
  return Math.round(result * 10000) / 10000;
};

export const checkDLine = (dlineValue, periodicity, status) => {
  let checkstatus = status === null ? '' : status.replace(' ', '');
  //task is done/in process
  if (checkstatus !== '') return checkstatus;

  //task is not done -> check deadline   is missed/righttime
  let result = '';
  let d = new Date();
  switch (+periodicity) {
    case 1:
      d.setHours(0);
      d.setMinutes(24 * dlineValue * 60);

      let checktime = (Date.now() - d) / 1000 / 60; //minutesdiff
      if (checktime > 0) result = 'missed';
      else if (checktime > -60) result = 'righttime';

      break;
    case 7:
      if (d.getDay() > dlineValue) result = 'missed';
      else if (d.getDay() === dlineValue) result = 'righttime';

      break;
    case 30:
      if (d.getDate() > dlineValue) result = 'missed';
      else if (d.getDate() === dlineValue) result = 'righttime';

      break;
    default:
      break;
  }

  return result;
};

export const getStatus = (periodicity, started, finished) => {
  let d = new Date();
  d.setHours(0);
  const resultStr = (checkDate) => {
    if (started > checkDate) {
      if (finished > started) return 'done';
      return 'inprocess';
    } else {
      return '';
    }
  };
  switch (+periodicity) {
    case 1:
      return resultStr(d);
    case 7:
      return resultStr(firstDayOfWeek(d));
    case 30:
      return resultStr(firstDayOfMonth(d));
  }
  return '';
};
