export const pad = (num, places) => String(num).padStart(places, '0');
const firstDayOfWeek = (date) => date.setDate(date.getDate() - date.getDay());
const firstDayOfMonth = (date) => date.setDate(1);

export const wkdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const dailyDlineValues = dLinePickerValues('1');
const weeklyDlineValues = dLinePickerValues('7');
const monthlyDlineValues = dLinePickerValues('30');

export const periodicity = [
  { name: 'Daily', value: '1', dlineArr: dailyDlineValues },
  { name: 'Weekly', value: '7', dlineArr: weeklyDlineValues },
  { name: 'Monthly', value: '30', dlineArr: monthlyDlineValues },
];

export const dlinefromfloat = (dlineValue, periodicity) => {
  switch (+periodicity) {
    case 1:
      let d = new Date();
      d.setHours(0);
      d.setMinutes(+dlineValue);
      return `${pad(d.getHours(), 2)}:${pad(d.getMinutes(), 2)}`;
    case 7:
      return wkdays[+dlineValue];
    case 30:
      return (+dlineValue).toFixed(0);
    default:
      return '00:00';
  }
};

export const checkDLine = (dlineValue, periodicity, status) => {
  let checkstatus = status === null ? '' : status.replace(' ', '');
  //task is done/in process
  if (checkstatus !== 'todo') return checkstatus;

  //task is not done -> check deadline   is missed/righttime
  let result = '';
  let d = new Date();
  switch (+periodicity) {
    case 1:
      d.setHours(0);
      d.setMinutes(dlineValue);
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
      return 'todo';
    }
  };
  switch (+periodicity) {
    case 1:
      return resultStr(d);
    case 7:
      return resultStr(firstDayOfWeek(d));
    case 30:
      return resultStr(firstDayOfMonth(d));
    default:
      return '';
  }
};

function dLinePickerValues(periodicityValue) {
  const dlineObj = [];
  switch (+periodicityValue) {
    case 1:
      for (let hh = 0; hh <= 23; hh++) {
        for (let mm = 0; mm <= 59; mm += 15) {
          dlineObj.push({
            name: `${pad(hh, 2)}:${pad(mm, 2)}`,
            value: `${hh * 60 + mm}`,
          });
        }
      }
      break;
    case 7:
      for (let wd = 0; wd < wkdays.length; wd++) {
        dlineObj.push({ name: wkdays[wd], value: `${wd}` });
      }
      break;
    case 30:
      for (let d = 1; d <= 31; d++) {
        dlineObj.push({ name: d, value: `${d}` });
      }
      break;
    default:
      dlineObj.push({ name: '', value: '' });
      break;
  }
  return dlineObj;
}

export const dlineOptions = (task, periodicity) => {
  let valuesArr = periodicity.filter(
    (x) => x.value === (task.PERIODICITY ? task.PERIODICITY : '1')
  )[0].dlineArr;
  let addOption = !valuesArr.filter((x) => x.value === task.DEADLINE).length
    ? {
        name: `${dlinefromfloat(task.DEADLINE, task.PERIODICITY)} `,
        value: task.DEADLINE,
      }
    : null;
  return addOption ? [addOption, ...valuesArr] : valuesArr;
};
