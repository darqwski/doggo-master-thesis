import React, {useContext, useState} from 'react';
import {ApplicationContext} from "../../context/application-context/application-context";
import './login-page.less';

const LoginPage = () => {
	const { loginFailed } = useContext(ApplicationContext)
	const [login, setLogin] = useState('');
	const [password, setPassword] = useState('');

	return (
		<form method="POST">
			<div className="card login-card">
				<div className="card-title">
					<h3>Panel logowania</h3>
				</div>
				<div className="card-content">
					<div>
						<label>Podaj login</label>
						<input value={login} name="login" onChange={({ target: { value } })=>setLogin(value)} />
					</div>
					<div>
						<label>Podaj hasło</label>
						<input value={password} name="password" onChange={({ target: { value } })=>setPassword(value)} type="password" />
					</div>
					{loginFailed && <div className="error-text red-text">{loginFailed}!</div>}
				</div>
				<div className="card-action">
					<button className="btn-large brown darken-4" type="submit">Zaloguj</button>
				</div>
			</div>
		</form>
	);
};
export default LoginPage;