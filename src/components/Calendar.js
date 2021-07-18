import moment from 'moment';
import 'moment/locale/ru';

moment.locale('ru');
moment.updateLocale('ru', {
  months: {
    standalone: [
      'Январь',
      'Февраль',
      'Март',
      'Апрель',
      'Май',
      'Июнь',
      'Июль',
      'Август',
      'Сентябрь',
      'Октябрь',
      'Ноябрь',
      'Декабрь'],
    format: [
      'Января',
      'Февраля',
      'Марта',
      'Апреля',
      'Мая',
      'Июня',
      'Июля',
      'Августа',
      'Сентября',
      'Октября',
      'Ноября',
      'Декабря'],
  },
});

const getMonthData = (year, month) => {
  const result = [];
  
  const date = new moment(`${year}-${month}-1`);
  const firstDayOfMonth = date.format('d') - 1;
  const daysInMonth = date.daysInMonth();
  const daysInWeek = 7;
  
  const nextMonth = month === 12 ? 1 : Number(month) + 1;
  const previousMonth = month === 1 ? 12 : Number(month) - 1;
  let daysInPreviousMonth = new moment(`${year}-${previousMonth}-1`).daysInMonth();
  
  let day = 1;
  let nextMonthDay = 1;
  
  for (let i = 0; i < (daysInMonth + firstDayOfMonth) / daysInWeek; i++) {
    result[i] = [];
    
    for (let j = 0; j < daysInWeek; j++) {
      if ((i === 0 && j < firstDayOfMonth)) {
        result[i][(firstDayOfMonth - 1) - j] = new moment(`${year}-${previousMonth}-${daysInPreviousMonth--}`);
      } else if (day > daysInMonth) {
        result[i][j] = new moment(`${year}-${nextMonth}-${nextMonthDay++}`);
      } else {
        result[i][j] = new moment(`${year}-${month}-${day++}`);
      }
    }
  }
  
  return result;
};

const Calendar = ({ date }) => {
  const currentDate = new moment(date);
  
  const year = currentDate.format('Y');
  const month = currentDate.format('M');
  const monthStandard = currentDate.format('MMMM');
  const monthWithDeclension = currentDate.format('DD MMMM').slice(3);
  const weekday = `${currentDate.format('dddd')[0].toUpperCase()}${currentDate.format('dddd').slice(1)}`;
  const today = currentDate.format('D');
  
  const monthData = getMonthData(year, month);
  
  return (
    <div className="ui-datepicker">
      <div className="ui-datepicker-material-header">
        <div className="ui-datepicker-material-day">
          {weekday}
        </div>
        <div className="ui-datepicker-material-date">
          <div className="ui-datepicker-material-day-num">{today}</div>
          <div className="ui-datepicker-material-month">{monthWithDeclension}</div>
          <div className="ui-datepicker-material-year">{year}</div>
        </div>
      </div>
      
      <div className="ui-datepicker-header">
        <div className="ui-datepicker-title">
          <span className="ui-datepicker-month">{monthStandard}</span>&nbsp;
          <span className="ui-datepicker-year">{year}</span>
        </div>
      </div>
      
      <table className="ui-datepicker-calendar">
        <colgroup>
          <col />
          <col />
          <col />
          <col />
          <col />
          <col className="ui-datepicker-week-end" />
          <col className="ui-datepicker-week-end" />
        </colgroup>
        <thead>
        <tr>
          <th scope="col" title="Понедельник">Пн</th>
          <th scope="col" title="Вторник">Вт</th>
          <th scope="col" title="Среда">Ср</th>
          <th scope="col" title="Четверг">Чт</th>
          <th scope="col" title="Пятница">Пт</th>
          <th scope="col" title="Суббота">Сб</th>
          <th scope="col" title="Воскресенье">Вс</th>
        </tr>
        </thead>
        <tbody>
        {monthData.map((week, index) =>
          <tr key={index}>
            {week.map((date, index) =>
              <td className={`
                  ${date.format('D') === today && date.format('M') === month ? 'ui-datepicker-today' : ''}
                  ${date.format('M') !== month ? 'ui-datepicker-other-month' : ''}
                `} key={index}
              >
                {date.format('D')}
              </td>,
            )}
          </tr>,
        )}
        </tbody>
      </table>
    </div>
  );
};

export default Calendar;