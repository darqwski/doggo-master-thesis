import React from 'react'
import { Route, BrowserRouter as Router } from 'react-router-dom'
import './css/materialize.css'
import './css/global.css'
import './css/variables.less'
import LandingPage from './application/landing-page/LandingPage'
import ApplicationContextManager from './context/application-context/ApplicationContextManager'
import LoginPage from './application/login-page/LoginPage'
import SnackbarManager from './components/snackbar/SnackbarContextManager'
import RegisterPage from "./application/register-page/RegisterPage";

const routing = [
    { path: '/', component: LandingPage },
    { path: '/login', component: LoginPage },
    { path: '/register', component: RegisterPage },
]

const App = () => {
    return (
        <Router forceRefresh>
            {routing.map(({ path, component }, index) => (
                <Route
                    exact
                    path={path}
                    component={component}
                    key={`routing-${index}`}
                />
            ))}
        </Router>
    )
}

const AppWithContext = () => (
    <ApplicationContextManager>
        <SnackbarManager>
            <App />
        </SnackbarManager>
    </ApplicationContextManager>
)

export default AppWithContext
