import React from 'react'
import BasicPage from '../../components/basic-page/BasicPage'
import useAppRequest from "../../hooks/use-app-request";
import {IReservation} from "../../model/reservation";
import ReservationCard from "../active-reservation/ReservationCard";
import {IDogWithReservation, IDogWithReservationAndOwner} from "../../model/dog";

export interface IMyOffersPage {}

const MyOffersPage: React.FC = () => {
    const { data: offers } = useAppRequest<IDogWithReservationAndOwner[]>({ url: '/API/my-offers'})
    console.log({ offers })
    return (
        <BasicPage>
            <div>
                <h3>Moje rezerwacje</h3>
                {offers?.map((dogWithReservationAndOwner) => (
                    <ReservationCard
                        dogWithReservationAndOwner={dogWithReservationAndOwner}
                        key={dogWithReservationAndOwner.reservationId}
                        edit
                    />
                ))}
            </div>
        </BasicPage>
    )
}

export default MyOffersPage
