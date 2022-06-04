import React from 'react';
import {ApplicationContext} from "./application-context";

const ApplicationContextManager: React.FC<{children: JSX.Element}> = ({ children }) => {
	const applicationData = document.querySelector("#react-data");
	const json = JSON.parse(applicationData?.innerHTML || '')
    return <ApplicationContext.Provider value={{
    	isLogged: !!json.login,
		login: json.login,
		loginFailed: json.loginFailed
	}}>{children}</ApplicationContext.Provider>;
};

export default ApplicationContextManager;