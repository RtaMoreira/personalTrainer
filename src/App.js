import React, { useState } from "react";
import "./App.css";
import { Button, AppBar, Toolbar } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import CustomersList from "./components/CustomersList";
import TrainingList from "./components/TrainingList";
import Calendar from "./components/Calendar";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import GroupIcon from "@material-ui/icons/Group";
import Drawer from "@material-ui/core/Drawer";
import MenuIcon from "@material-ui/icons/Menu";
import SportsKabaddiIcon from "@material-ui/icons/SportsKabaddi";
import EventIcon from "@material-ui/icons/Event";
import Icon from "@material-ui/core/Icon";


function App() {
  const [toDisplay, setToDisplay] = useState("customers");
  const [drawer, setDrawer] = useState(false);

  const toggleDrawer = open => event => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setDrawer(open);
  };

  const display = () => {
    if (toDisplay === "customers") return <CustomersList />;
    if (toDisplay === "trainings") return <TrainingList />;
    if (toDisplay === "calendar") return <Calendar />;
  };

  const sideList = side => (
    <div className="drawer" role="presentation" onClick={toggleDrawer(false)}>
      <List>
        <ListItem
          button
          key={"customers"}
          onClick={() => setToDisplay("customers")}
        >
          <ListItemIcon>{<GroupIcon />}</ListItemIcon>
          <ListItemText primary={"Customers"} />
        </ListItem>
        <ListItem
          button
          key={"trainings"}
          onClick={() => setToDisplay("trainings")}
        >
          <ListItemIcon>{<SportsKabaddiIcon />}</ListItemIcon>
          <ListItemText primary={"Trainings"} />
        </ListItem>
        <ListItem
          button
          key={"calendar"}
          onClick={() => setToDisplay("calendar")}
        >
          <ListItemIcon>{<EventIcon />}</ListItemIcon>
          <ListItemText primary={"Calendar"} />
        </ListItem>
      </List>
    </div>
  );

  return (

    <div className="App">
      <AppBar position="static" style={{ background: '#981414' }}>
        <Toolbar>
          <Button onClick={() => setDrawer(true)}>
            <Icon>
              <MenuIcon />
            </Icon>
          </Button>
          <Typography variant="h6">Personal Trainer Company</Typography>
        </Toolbar>
      </AppBar>
      <Drawer open={drawer} onClose={() => setDrawer(false)}>
        {sideList()}
      </Drawer>
      {display()}
    </div>
  );
}

export default App;
