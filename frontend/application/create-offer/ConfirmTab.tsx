import React from 'react';
import ReservationCard from "../active-reservation/ReservationCard";
import {IDogWithReservation, IDogWithReservationAndOwner} from "../../model/dog";
import {Button, Card} from "react-materialize";

export interface IConfirmTab {
    dogWithReservation?: IDogWithReservation
    confirmOffer: () => Promise<void>
}

const ConfirmTab: React.FC<IConfirmTab> = ({ dogWithReservation, confirmOffer }) => {
    if(!dogWithReservation){
        throw 'No dog'
    }
    const  dogWithReservationAndOwner: IDogWithReservationAndOwner =  { ...dogWithReservation , ownerLogin: '' }

    return <>
        <Card><h3>Krok 3. Zatwierdź ostateczny wygląd oferty</h3></Card>
        <ReservationCard dogWithReservationAndOwner={dogWithReservationAndOwner} />
        <Card><Button onClick={confirmOffer}>Zatwierdzam</Button></Card>
    </>;
};

export default ConfirmTab;