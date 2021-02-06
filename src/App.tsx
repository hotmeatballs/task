import React, {useState, useEffect} from 'react';
import AppContext from "./utils/context/AppContext";
import {Switch, Route, Redirect, withRouter, useHistory} from 'react-router';
import Login from './pages/Login';
import Calendar from './pages/Calendar';
import './App.css';

function App() {
    const history = useHistory();
    const [authenticated, setAuthenticated] = useState(false);
    const [profile, setProfile] = useState({});
    const isLoginPageUrl = history?.location?.pathname === '/login';

    return (
        <AppContext.Provider
            value={{
                authenticated,
                setAuthenticated,
                profile,
                setProfile,
            }}
        >
            <Switch>
                {/*{!authenticated && !isLoginPageUrl && <Redirect to="/login" />}*/}
                <Route exact path="/calendar" component={Calendar}/>
                <Route exact path="/login" component={Login}/>

            </Switch>
        </AppContext.Provider>
    );
}

export default App;
