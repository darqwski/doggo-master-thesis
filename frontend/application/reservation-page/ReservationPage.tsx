import React from 'react'
import { useParams } from 'react-router-dom'
import BasicPage from '../../components/basic-page/BasicPage'
import useAppRequest from '../../hooks/use-app-request'
import {Button, Card} from "react-materialize";
import {IDog, IDogWithReservationAndOwner} from "../../model/dog";
import {IReservation} from "../../model/reservation";
import {IBreeding} from "../../model/breeding";
import {IUser} from "../../model/user";
import './reservation-page.less';

export interface IReservationPage {}

const ReservationPage: React.FC = () => {
    const { reservationId } = useParams<{ reservationId: string }>()
    const { data } = useAppRequest<{
    	reservation: IReservation,
		dog: IDog,
		breeding: IBreeding,
		owner: IUser
	}>({ url: `/API/reservation/${reservationId}` })

	const { reservation, breeding, owner, dog } = data || {}


    return (
        <BasicPage>
            <Card>
				<div className="reservation__section">
					<h3 className="reservation__section-title">
						Dane rezerwacji
					</h3>
					<div className="reservation__section-content">
						<div className="value-desc">
							<div className="desc">Data utworzenia</div>
							<div className="value">{reservation?.creationDate}</div>
						</div>
						<div className="value-desc">
							<div className="desc">Status rezerwacji</div>
							<div className="value">{reservation?.status === 'created' ? 'Otwarta' : 'Zakończona'}</div>
						</div>
					</div>
				</div>
				<div className="reservation__section">
					<h3 className="reservation__section-title">
						Dane hodowli
					</h3>
					<div className="value-desc">
						<div className="desc">Nazwa hodowli</div>
						<div className="value">{breeding?.name}</div>
					</div>
					<div className="value-desc">
						<div className="desc">Adres hodowli</div>
						<div className="value">{breeding?.address}</div>
					</div>
					<div className="value-desc">
						<div className="desc">Właściciel hodowli</div>
						<div className="value">{owner?.login}</div>
					</div>
				</div>
				<div className="reservation__section">
					<h3 className="reservation__section-title">
						Opis psa
					</h3>
					<div className="reservation__section-description-container">
						<img className="reservation__section-description-image" src={dog?.profileImage} />
						<div className="reservation__section-description-text">
							{reservation?.description || reservation?.shortDescription}
						</div>
					</div>
				</div>
				<div className="reservation__section">
					<h3 className="reservation__section-title">
						Cena
					</h3>
					<div className="reservation__section-content">
						<span className="reservation__section-price">{reservation?.price} zł</span>
					</div>
					<div className="reservation__section-buttons">
						<Button>Biere</Button>
						<a href="/dogs/for-sale">Nie tego szukam</a>

					</div>
				</div>
			</Card>
        </BasicPage>
    )
}

export default ReservationPage
