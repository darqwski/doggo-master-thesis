import React from 'react';
import OfferCard from "../active-offers/OfferCard";
import {IDogWithOffer, IDogWithOfferAndOwner} from "../../model/dog";
import {Button, Card} from "react-materialize";

export interface IConfirmTab {
    dogWithOffer?: IDogWithOffer
    confirmOffer: () => Promise<void>
}

const ConfirmTab: React.FC<IConfirmTab> = ({ dogWithOffer, confirmOffer }) => {
    if(!dogWithOffer){
        throw 'No dog'
    }
    const  dogWithOfferAndOwner: IDogWithOfferAndOwner =  { ...dogWithOffer , ownerLogin: '' }

    return <>
        <Card><h3>Krok 3. Zatwierdź ostateczny wygląd oferty</h3></Card>
        <OfferCard dogWithOfferAndOwner={dogWithOfferAndOwner} />
        <Card><Button onClick={confirmOffer}>Zatwierdzam</Button></Card>
    </>;
};

export default ConfirmTab;