import { Icon } from 'react-materialize'
import React, { useContext } from 'react'
import { ApplicationContext } from '../../context/application-context/application-context'

const BasicNavUserInfo: React.FC = () => {
    const { isLogged, login } = useContext(ApplicationContext);

    return (
        <div className="basic-page__nav-user-info">
            <Icon medium>person</Icon>
            {login ? <span>{login}</span> : (
                <a href="/register">Zarejestruj się</a>
            )}
            {isLogged ? (
                <a href="/logout">Wyloguj</a>
            ) : (
                <a href="/login">Zaloguj</a>
            )}
        </div>
    )
}

export default BasicNavUserInfo
