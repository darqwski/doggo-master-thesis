import React, {useContext} from 'react';
import {Icon, SideNav} from "react-materialize";
import {ApplicationContext} from "../../context/application-context/application-context";
import './basic-page-side-nav.less';

export interface IBasicSideNav {

}

const BasicSideNav: React.FC = () => {
	const { login, type  } = useContext(ApplicationContext)
	const isBreeder = type === 'breeder';
	const isClient = type === 'client';
	const isAdmin = type === 'admin';
	const isVet = type === 'vet';

    return (
        <SideNav trigger={<Icon>menu</Icon>}>
			<div className="basic-page-side-nav">
				<div className="basic-page-side-nav__user-info">
					<strong className="basic-page-side-nav__user-info-name">{login}</strong>
				</div>
				<div className="basic-page-side-nav__link-container">
					<h5 className="basic-page-side-nav__link-title">Aktualności</h5>
					<a className="basic-page-side-nav__link-item" href="/dashboard"> Ostatnie wydarzenia </a>
					<a className="basic-page-side-nav__link-item" href="/dogs"> Psy </a>
					<a className="basic-page-side-nav__link-item" href="/groups"> Grupy (zaślepka) </a>
					<a className="basic-page-side-nav__link-item" href="/chats"> Chat (zaślepka) </a>
					<h5 className="basic-page-side-nav__link-title">Psy</h5>
					{isBreeder && <a className="basic-page-side-nav__link-item" href="/dogs/create-offer"> Wystaw </a>}
					{isBreeder && <a className="basic-page-side-nav__link-item" href="/my-offers"> Moje oferty </a>}
					<a className="basic-page-side-nav__link-item" href="/my-dogs"> Moje psy </a>
					<a className="basic-page-side-nav__link-item" href="/dogs/for-sale"> Psy na sprzedaż </a>

				</div>
			</div>
        </SideNav>
    )
};

export default BasicSideNav;