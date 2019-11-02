import React, { useState, useEffect } from "react";
import MaterialTable from "material-table";
import TableIcons from "./TableIcons";
import AddTraining from "./AddTraining";
import SportsIcon from "@material-ui/icons/Sports";
import Paper from "@material-ui/core/Paper";

const CustomersList = () => {
  const [customers, setCustomers] = useState([]);
  const [open, setOpen] = useState(false);
  const [customerId, setCustomerId] = useState(""); //for adding a new training

  useEffect(() => {
    fetchCustomers();
    // eslint-disable-next-line
  }, []);

  //get customers list
  const fetchCustomers = () => {
    fetch("https://customerrest.herokuapp.com/api/customers")
      .then(response => response.json())
      .then(data => {
        setCustomers(data.content);
        console.log(customers);
      })
      .catch(err => console.error(err));
  };

  //updating a customer
  const updateCustomer = (customer, link) => {
    fetch(link, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(customer)
    })
      .then(res => fetchCustomers())
      .catch(err => console.log(err));
  };

  //Adding new customer
  const saveCustomer = newCustomer => {
    fetch("https://customerrest.herokuapp.com/api/customers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newCustomer)
    })
      .then(res => fetchCustomers())
      .catch(err => console.log(err));
  };

  //delete a customer and his trainings
  const deleteCustomer = link => {
    //delete customer
    fetch(link[0].href, { method: "DELETE" })
      .then(res => fetchCustomers())
      .catch(err => console.error(err));
  };

  const saveTraining = newTraining => {
    fetch("https://customerrest.herokuapp.com/api/trainings", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newTraining)
    })
      .then(res => fetchCustomers())
      .catch(err => console.log(err));
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const columns = [
    { title: "Firstname", field: "firstname" },
    { title: "Lastname", field: "lastname" },
    { title: "Street address", field: "streetaddress" },
    { title: "PostCode", field: "postcode", type: "numeric" },
    { title: "City", field: "city" },
    { title: "Email", field: "email" },
    { title: "Phone", field: "phone" }
  ];

  return (
    <div>
      <Paper style={{ margin: 20 }}>
        <MaterialTable
          icons={TableIcons}
          title="Customers"
          columns={columns}
          data={customers}
          editable={{
            onRowAdd: newData =>
              new Promise(resolve => {
                setTimeout(() => {
                  resolve();
                  saveCustomer(newData);
                }, 600);
              }),
            onRowUpdate: (newData, oldData) =>
              new Promise(resolve => {
                setTimeout(() => {
                  resolve();
                  if (oldData) {
                    updateCustomer(newData, newData.links[0].href);
                  }
                }, 600);
              }),
            onRowDelete: oldData =>
              new Promise(resolve => {
                setTimeout(() => {
                  resolve();
                  deleteCustomer(oldData.links);
                }, 600);
              })
          }}
          actions={[
            {
              icon: () => <SportsIcon />,
              tooltip: "New training",
              onClick: (event, rowData) => {
                setCustomerId(rowData.links[0].href);
                handleClickOpen(true);
              }
            }
          ]}
        />
        <AddTraining
          saveTraining={saveTraining}
          customerId={customerId}
          open={open}
          handleClose={handleClose}
        />
      </Paper>
    </div>
  );
};

export default CustomersList;
