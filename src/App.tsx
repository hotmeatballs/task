import React, { useEffect, useState } from "react";
import AppContext from "./utils/context/AppContext";
import {
  Switch,
  Route,
  Redirect,
  withRouter,
  useHistory,
} from "react-router-dom";
import Login from "./pages/Login";
import Calendar from "./pages/Calendar";
import "./App.css";
import { IEvent } from "./models/event";
import { IProfile } from "./models/profile";
import { checkAuth } from "./api/auth";
import { getEvents } from "./api/events";

function App() {
  const history = useHistory();
  //store users credentials (for example) :)
  const [users] = useState([
    { username: "Admin", password: "123" },
    { username: "Admin2", password: "123" },
  ]);
  const [profile, setProfile] = useState<IProfile | null>(null);
  const [events, setEvents] = useState<IEvent[]>([]);
  const isLoginPageUrl = history?.location?.pathname === "/login";
  useEffect(() => {
    const fetchData = async () => {
      const { profile } = await checkAuth();
      const { events } = await getEvents();
      setProfile(profile);
      setEvents(events);
      history.push("/calendar");
    };
    fetchData();
  }, [history]);

  const logout = () => {
    setProfile(null);
  };
  return (
    <AppContext.Provider
      value={{
        users, //store users credentials (for example) :)
        profile,
        setProfile,
        events,
        setEvents,
        logout,
      }}
    >
      <Switch>
        {!profile && !isLoginPageUrl && <Redirect to="/login" />}
        <Route exact path="/login" component={Login} />
        <Route exact path="/calendar" component={Calendar} />
      </Switch>
    </AppContext.Provider>
  );
}

export default withRouter(App);
