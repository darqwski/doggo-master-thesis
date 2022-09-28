import React, {useState} from 'react';
import BasicPage from "../../components/basic-page/BasicPage";
import AdminMenuView from "./AdminMenuView";
import './admin.less'
import AdminUsersView from "./AdminUsersView";

export interface IAdministrationDashboard {

}

export const VIEWS = {
	MENU: 0,
	USERS: 1,
	OFFERS: 2,
	BREEDERS: 3,
}

const AdministrationDashboard: React.FC = () => {
	const [view, setView] = useState( VIEWS.MENU)
    return <BasicPage>
		<>
			{view === VIEWS.MENU && <AdminMenuView setView={setView}/>}
			{view === VIEWS.USERS && <AdminUsersView />}
		</>
	</BasicPage>;
};

export default AdministrationDashboard;