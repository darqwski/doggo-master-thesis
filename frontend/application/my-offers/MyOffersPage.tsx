import React from 'react'
import BasicPage from '../../components/basic-page/BasicPage'
import useAppRequest from "../../hooks/use-app-request";
import OfferCard from "../active-offers/OfferCard";
import {IDogWithOffer, IDogWithOfferAndOwner} from "../../model/dog";

export interface IMyOffersPage {}

const MyOffersPage: React.FC = () => {
    const { data: offers } = useAppRequest<IDogWithOfferAndOwner[]>({ url: '/API/my-offers'})
    console.log({ offers })
    return (
        <BasicPage>
            <div>
                <h3>Moje rezerwacje</h3>
                {offers?.map((dogWithOfferAndOwner) => (
                    <OfferCard
                        dogWithOfferAndOwner={dogWithOfferAndOwner}
                        key={dogWithOfferAndOwner.offerId}
                        edit
                    />
                ))}
            </div>
        </BasicPage>
    )
}

export default MyOffersPage
