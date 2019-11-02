import React, { useState, useEffect } from "react";
import MaterialTable from "material-table";
import TableIcons from "./TableIcons";
import Paper from "@material-ui/core/Paper";

const TrainingList = () => {
  const [trainings, setTrainings] = useState([]);

  useEffect(() => {
    fetchTrainings();
  }, []);

  //get customers list
  const fetchTrainings = () => {
    fetch("https://customerrest.herokuapp.com/gettrainings")
      .then(response => response.json())
      .then(data => {
        setTrainings(data);
      })
      .catch(err => console.error(err));
  };

  //Delete training
  const deleteTraining = training => {
    var link =
      "https://customerrest.herokuapp.com/api/trainings/" + training.id;
    fetch(link, { method: "DELETE" })
      .then(res => fetchTrainings())
      .catch(err => console.error(err));
  };

  const columns = [
    {
      title: "Date",
      field: "date",
      render: rowData => {
        var dateFormat = require("dateformat");
        return dateFormat(rowData.date, "mmm dd yy, hh:MM");
      }
    },
    { title: "Duration", field: "duration" },
    { title: "Activity", field: "activity" },
    {
      title: "Customer",
      field: "customer.firstname",
      render: rowData =>
        rowData.customer.firstname + " " + rowData.customer.lastname
    }
  ];

  return (
    <div>
      <Paper style={{ margin: 20 }}>
        <MaterialTable
          icons={TableIcons}
          title="Trainings"
          columns={columns}
          data={trainings}
          editable={{
            onRowDelete: oldData =>
              new Promise(resolve => {
                setTimeout(() => {
                  resolve();
                  deleteTraining(oldData);
                }, 600);
              })
          }}
        />
      </Paper>
    </div>
  );
};

export default TrainingList;
