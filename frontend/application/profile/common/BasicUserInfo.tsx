import React from 'react';
import {IUser} from "../../../model/user";

export interface IBasicUserInfo {
	user: IUser
}

const BasicUserInfo: React.FC<IBasicUserInfo> = ({user}) => {
    return <div>
		<h3>Dane ogólne</h3>
		<div className="value-desc">
			<p className="desc">Imię i nazwisko</p>
			<p className="value">{user.firstName} {user.lastName}</p>
		</div>
		<div className="value-desc">
			<p className="desc">Kontakt</p>
			<p className="value">{user.email}</p>
		</div>

	</div>;
};

export default BasicUserInfo;