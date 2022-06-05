import React from 'react'
import BasicPage from '../../components/basic-page/BasicPage'
import useAppRequest from '../../hooks/use-app-request'
import {
    IDogWithReservation,
    IDogWithReservationAndOwner,
} from '../../model/dog'
import ReservationCard from './ReservationCard'

export interface IActiveReservationsPage {}

const ActiveReservationsPage: React.FC = () => {
    const { data = [] } = useAppRequest<IDogWithReservationAndOwner[]>({
        url: '/API/get-active-reservations',
    })

    return (
        <BasicPage>
            <div>
				<h3 style={{textAlign: 'center'}}>Tablica ogłoszeń</h3>
				{data?.map((dogWithReservationAndOwner) => (
					<ReservationCard
						dogWithReservationAndOwner={dogWithReservationAndOwner}
						key={dogWithReservationAndOwner.reservationId}
					/>
				))}
			</div>
        </BasicPage>
    )
}

export default ActiveReservationsPage
