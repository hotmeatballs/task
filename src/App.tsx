import React, {useState} from 'react';
import AppContext from "./utils/context/AppContext";
import {Switch, Route, Redirect, withRouter, useHistory} from 'react-router-dom';
import Login from './pages/Login';
import Calendar from './pages/Calendar';
import './App.css';
import {IEvent} from "./models/event";
import {IProfile} from "./models/profile";

function App() {
    const history = useHistory();
    const [users] = useState([{username: 'Admin', password: '123'}, {username: 'Admin2', password: '123'}]);
    const [authenticated, setAuthenticated] = useState(false);
    const [profile, setProfile] = useState<IProfile | null>(null);
    const [events, setEvents] = useState<IEvent[]>([]);
    const isLoginPageUrl = history?.location?.pathname === '/login';

    const logout = () => {
        setAuthenticated(false);
        setProfile(null);
    }
    return (
        <AppContext.Provider
            value={{
                users,
                authenticated,
                setAuthenticated,
                profile,
                setProfile,
                events,
                setEvents,
                logout: logout
            }}
        >
            <Switch>
                {!authenticated && !isLoginPageUrl && <Redirect to="/login"/>}
                <Route exact path="/login" component={Login}/>
                <Route exact path="/calendar" component={Calendar}/>
            </Switch>
        </AppContext.Provider>
    );
}

export default withRouter(App);
