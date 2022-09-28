import React from 'react';
import {IUserWithAdminData} from "../../model/user";

export interface IAdminUserCard {
	user: IUserWithAdminData
}

const AdminUserCard: React.FC<IAdminUserCard> = ({user }) => {
    const givenOpinionsClassName = user.givenOpinions > 10 ? 'red lighten-2' : ''
    const receivedOpinionsClassName = user.receivedOpinions > 1 ? 'red lighten-2' : ''

    return <div className="card admin-user-card">
        <h5>{user.login}</h5>
        <div className="value-desc">
            <div className={`value ${givenOpinionsClassName}`}>{user.givenOpinions}</div>
            <div className={`desc ${givenOpinionsClassName}`}>Wystawione opinie</div>
        </div>
        <div className="value-desc">
            <div className={`value ${receivedOpinionsClassName}`}>{user.receivedOpinions}</div>
            <div className={`desc ${receivedOpinionsClassName}`}>Otrzymane opinie</div>
        </div>
        <div className="value-desc">
            <div className="value">{user.dogsAmount}</div>
            <div className="desc">Kupione psy</div>
        </div>
    </div>;
};

export default AdminUserCard;