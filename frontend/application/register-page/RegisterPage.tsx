import React, { useContext, useState } from 'react'
import appRequest from '../../utils/app-request'
import { SnackbarContext } from '../../components/snackbar/snackbar-context'
import {Select} from "react-materialize";
import './register-page.less';

const RegisterPage = () => {
    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')
    const [type, setType] = useState("1")
    const [email, setEmail] = useState("")
    const [passwordRepeat, setPasswordRepeat] = useState('')
    const [error, setError] = useState<string | undefined>(undefined)
    const { addSnackBar } = useContext(SnackbarContext)

    const onSave = () => {
        if (!login) {
            setError('Brak podanego loginu')
            return
        }
        if (!password || !passwordRepeat) {
            setError('Brak podanego hasła')
            return
        }
        if (password !== passwordRepeat) {
            setError('Podane hasła różnią się')
            return
        }
        setError(undefined)

		appRequest({
            url: '/API/register',
            method: 'POST',
            data: {login, password, type, email},
			// @ts-ignore
		}).then(({ data: { message, error } }) => {
				if(!error) {
					setError(undefined)
					setPasswordRepeat('')
					setPassword('')
					setLogin('')
					addSnackBar({
						text: `${message || error}, za 5 sekund nastąpi przekierowanie na stronę logowania`,
					})
					setTimeout(() => (window.location.href = '../login'), 5000)
				} else {
					addSnackBar({ text: error })
				}
        }).catch(e=>{
        	console.log(e)
			// @ts-ignore
			addSnackBar({ text: error })
		})
    }

    return (
        <div className="card register-card">
            <div className="card-title">
                <h3>Panel rejestracyjny</h3>
            </div>
            <div className="card-content">
                <div>
                    <label>Podaj login</label>
                    <input
                        value={login}
                        onChange={({ target: { value } }) => setLogin(value)}
                    />
                </div>
                <div>
                    <label>Podaj hasło</label>
                    <input
                        value={password}
                        onChange={({ target: { value } }) => setPassword(value)}
                        type="password"
                    />
                </div>
                <div>
                    <label>Powtórz hasło</label>
                    <input
                        value={passwordRepeat}
                        onChange={({ target: { value } }) =>
                            setPasswordRepeat(value)
                        }
                        type="password"
                    />
                </div>
                <div>
                    <label>Email</label>
                    <input
                        value={email}
                        onChange={({ target: { value } }) =>
                            setEmail(value)
                        }
                    />
                </div>
				<div>
					<label>
						Chcę się zarejestrować jako
					</label>
					<Select value={type} onChange={(event)=>setType(event.target.value)}>
						<option value="1">Posiadacz/Przyszły posiadacz psa</option>
						<option value="2">Właściciel hodowli</option>
						<option value="3">Weterynarz</option>
					</Select>
				</div>
                {error && <div className="error-text red-text">{error}!</div>}
            </div>
            <div className="card-action">
                <button className="btn-large green" onClick={onSave}>
                    Zarejestruj
                </button>
            </div>
        </div>
    )
}

export default RegisterPage
