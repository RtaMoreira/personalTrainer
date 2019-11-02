import React, { useState, useEffect } from "react";
import Paper from "@material-ui/core/Paper";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import "@fullcalendar/core/main.css";
import "@fullcalendar/daygrid/main.css";

const Calendar = () => {
  const [trainings, setTraining] = useState([]);

  useEffect(() => {
    fetchTrainings();
  }, []);

  const fetchTrainings = () => {
    let trainingsInfo = [];
    fetch("https://customerrest.herokuapp.com/gettrainings")
      .then(response => response.json())
      .then(data => {
        console.log(data);
        data.forEach(training => {
          var dateStart = new Date(training.date);
          var dateEnd = new Date(training.date);
          //Add duration
          dateEnd.setHours(
            dateEnd.getHours(),
            dateEnd.getMinutes() + training.duration,
            0,
            0
          );

          //Push to array
          trainingsInfo.push({
            title: training.activity,
            start: dateStart,
            end: dateEnd
          });
        });
      })
      .then(data => setTraining(trainingsInfo))
      .catch(err => console.error(err));
  };

  return (
    <div>
      <Paper style={{ margin: 20 }}>
        <FullCalendar
          plugins={[dayGridPlugin]}
          header={{ center: "dayGridMonth,dayGridWeek,dayGridDay" }}
          events={trainings}
          eventColor='#981414'
        />
      </Paper>
    </div>
  );
};

export default Calendar;
