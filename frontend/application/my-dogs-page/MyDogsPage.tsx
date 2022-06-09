import React from 'react'
import BasicPage from '../../components/basic-page/BasicPage'
import useAppRequest from "../../hooks/use-app-request";
import {Preloader} from "react-materialize";
import { IDogWithBreedingAndReservation } from "../../model/dog";
import MyDogTile from "./components/MyDogTile";

export interface IMyDogsPage {}

const MyDogsPage: React.FC = () => {

	const { data: myDogs } = useAppRequest<IDogWithBreedingAndReservation[]>({ url: '/API/get-user-dogs' })

    return <BasicPage>
			{myDogs ?  (
				<div>
					<h3>{myDogs.length === 1 ? "Mój pies" : "Moje psy"}</h3>
					<div>
						{myDogs.map(myDog=>(<MyDogTile dog={myDog} key={myDog.dogId} isOwner />))}
					</div>
				</div>
			) : (<Preloader />)}

        </BasicPage>

}

export default MyDogsPage
