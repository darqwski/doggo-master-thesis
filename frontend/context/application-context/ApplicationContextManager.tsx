import React from 'react';
import {ApplicationContext} from "./application-context";

export interface IApplicationContextManager {

}

const ApplicationContextManager: React.FC = ({ children }) => {
	const applicationData = document.querySelector("#react-data");
	const json = JSON.parse(applicationData?.innerHTML || '')
    return <ApplicationContext.Provider value={{
    	isLogged: json.isLogged,
		login: json.login
	}}>{children}</ApplicationContext.Provider>;
};

export default ApplicationContextManager;