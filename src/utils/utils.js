const pad = (num, places) => String(num).padStart(places, '0');
const firstDayOfWeek = (date) => date.setDate(date.getDate() - date.getDay());
const firstDayOfMonth = (date) => date.setDate(1);

export const dlinefromfloat = (dlineValue, periodicity) => {
  switch (+periodicity) {
    case 1:
      let d = new Date();
      d.setHours(0);
      d.setMinutes(24 * dlineValue * 60);
      return `${pad(d.getHours(), 2)}:${pad(d.getMinutes(), 2)}`;

    case 7:
      let wkdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
      return wkdays[dlineValue - 1];

    case 30:
      return (+dlineValue).toFixed(0);

    default:
      return '00:00';
  }
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
  switch (+periodicity) {
    case 1:
      if (started > d) {
        if (finished > started) return 'done';
        return 'inprocess';
      } else {
        return '';
      }
    case 7:
      if (started > firstDayOfWeek(d)) {
        if (finished > started) return 'done';
        return 'inprocess';
      } else {
        return '';
      }
    case 30:
      if (started > firstDayOfMonth(d)) {
        if (finished > started) return 'done';
        return 'inprocess';
      } else {
        return '';
      }
  }
};
