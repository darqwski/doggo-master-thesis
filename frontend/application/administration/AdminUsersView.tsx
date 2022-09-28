import React from 'react';
import useAppRequest from "../../hooks/use-app-request";
import BasicPage from "../../components/basic-page/BasicPage";
import AdminUserCard from "./AdminUserCard";

const AdminUsersView: React.FC = () => {
	const { data: users, loading } = useAppRequest({ url: '/API/admin/users' })
    return <>
		{loading ? <div>Loading</div> : (
			<div style={{display:'flex', flexWrap: 'wrap', justifyContent: 'space-around'}}>
				{users.map(user=><AdminUserCard user={user} />) }
			</div>
		)}
	</>
};

export default AdminUsersView;