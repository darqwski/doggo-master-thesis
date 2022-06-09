import React from 'react';
import {IDog, IDogWithBreedingAndReservation} from "../../../model/dog";
import {Button, Card} from "react-materialize";
import {calculateAge} from "../../../utils/dog-utils";

export interface IMyDogTile {
	dog: IDogWithBreedingAndReservation
	isOwner: boolean
}

const MyDogTile: React.FC<IMyDogTile> = ({dog, isOwner }) => {
    return <Card>

		<div style={{display:'flex', flexDirection: 'column'}}>
			<div><h5>{dog.dogName}</h5></div>
			<div style={{display: 'flex'}}>
				<img src={dog.profileImage} style={{maxHeight:'10rem', marginRight: '1rem'}} />
				<div>
					<div className="value-desc">
						<div className="desc">Wiek</div>
						<div className="value">{calculateAge(dog.birth)}</div>
					</div>
					<div className="value-desc">
						<div className="desc">Rasa</div>
						<div className="value">{dog.race}</div>
					</div>
					<div className="value-desc">
						<div className="desc">Hodowla</div>
						<div className="value">{dog.name} - {dog.address}</div>
					</div>

					{dog.reservationId && (
						<a href={`/reservation/${dog.reservationId}`}>Na sprzedaż!</a>
					)}
				</div>
			</div>
			<div style={{display: 'flex', justifyContent: 'flex-end'}}>
				{isOwner && (
					<a style={{marginRight: '1rem'}}>Edytuj galerię zdjęć</a>
				)}
					<a href={`/reservation/${dog.reservationId}`} style={{marginRight: '1rem'}}>Zobacz galerią</a>
			</div>
		</div>
	</Card>;
};

export default MyDogTile;