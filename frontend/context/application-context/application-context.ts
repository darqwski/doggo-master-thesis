import React from "react";

export const ApplicationContext = React.createContext({
    login: '',
    isLogged: false,
    type: '',
    loginFailed: ''
})