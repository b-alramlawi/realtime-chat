// App.js

import React from 'react';
import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom';
import Home from './pages/home/HomePage';
import LoginPage from './pages/authentication/login/LoginPage';
import OTPPage from './pages/authentication/otp/OTPPage';
import NotFoundPage from "./pages/not-found/NotFoundPage";
import DebugBar from "./DebugBar";

const PrivateRoute = ({component: Component, ...rest}) => {
    const isAuthenticated = localStorage.getItem('authToken');

    return (
        <Route
            {...rest}
            render={(props) =>
                isAuthenticated ? <Component {...props} /> : <Redirect to="/login"/>
            }
        />
    );
};

function App() {
    return (
        <Router>
            <Switch>
                {/* Public Routes */}
                <Route path="/login" component={LoginPage}/>
                <Route path="/otp/:phoneNumber" component={OTPPage}/>

                {/*Private Routes */}
                <PrivateRoute path="/home" component={Home}/>
                <PrivateRoute path="/" component={Home}/>

                {/* 404 Not Found Pages routes */}
                <Route path="*" component={NotFoundPage}/>
            </Switch>
            <DebugBar/>

        </Router>
    );
}

export default App;
