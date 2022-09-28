import React, {Dispatch, SetStateAction} from 'react';
import {Card} from "react-materialize";
import {VIEWS} from "./AdministrationDashboard";

export interface IAdminMenuView {
    setView: Dispatch<SetStateAction<number>>
}

const AdminMenuView: React.FC<IAdminMenuView> = ({ setView }) => {

    return <Card>
        <div style={{display: 'flex', alignItems: 'center'}}>
            <div className="card brown darken-2 white-text admin-chose-view-card" onClick={()=>setView(VIEWS.USERS)}>Panel zarządzania użytkownikami</div>
            <div className="card brown darken-2 white-text admin-chose-view-card" onClick={()=>setView(VIEWS.OFFERS)}>Panel zarządzania ofertami</div>
            <div className="card brown darken-2 white-text admin-chose-view-card" onClick={()=>setView(VIEWS.BREEDERS)}>Panel zarządzania hodowlami</div>
        </div>
    </Card>;
};

export default AdminMenuView;