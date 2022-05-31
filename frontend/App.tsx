import React from 'react';
import { Route, BrowserRouter as Router, } from 'react-router-dom';
import './css/materialize.css';
import LandingPage from "./application/LandingPage";

const routing = [
	{ path: '/', component: LandingPage },
];

const App = () => {
	return (
		<div>
			<Router forceRefresh>
				{routing.map(({ path, component }, index)=> (
					<Route exact path={path} component={component} key={`routing-${index}`} />
				))}
			</Router>
		</div>
	);
};

const AppWithContext = ()=>(
	<App />
);

export default AppWithContext;