import React, {useState} from 'react';
import BasicPage from "../../components/basic-page/BasicPage";
import AdminMenuView from "./AdminMenuView";
import './admin.less'

export interface IAdministrationDashboard {

}

export const VIEWS = {
	MENU: 0,
	USERS: 0,
	OFFERS: 0,
	BREEDERS: 0,
}

const AdministrationDashboard: React.FC = () => {
	const [view, setView] = useState( VIEWS.MENU)
    return <BasicPage>
		<>
			{view === VIEWS.MENU && <AdminMenuView setView={setView}/>}
		</>
	</BasicPage>;
};

export default AdministrationDashboard;