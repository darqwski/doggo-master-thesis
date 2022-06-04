import { Icon } from 'react-materialize'
import React, {useContext} from 'react'
import {ApplicationContext} from "../../context/application-context/application-context";

const BasicNavUserInfo: React.FC = () => {
    const { isLogged, login } = useContext(ApplicationContext)
    return (
        <div className="basic-page__nav-user-info">
            <Icon medium>person</Icon>
            <span>user1</span>
            <span> Wyloguj </span>
        </div>
    )
}

export default BasicNavUserInfo
