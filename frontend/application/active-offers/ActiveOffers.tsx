import React from 'react'
import BasicPage from '../../components/basic-page/BasicPage'
import useAppRequest from '../../hooks/use-app-request'
import { IDogWithOfferAndOwner } from '../../model/dog'
import OfferCard from './OfferCard'

const ActiveOffers: React.FC = () => {
    const { data = [] } = useAppRequest<IDogWithOfferAndOwner[]>({
        url: '/API/get-active-offers',
    })

    return (
        <BasicPage>
            <div>
                <h3 style={{ textAlign: 'center' }}>Tablica ogłoszeń</h3>
                {data?.map((dogWithOfferAndOwner) => (
                    <OfferCard
                        dogWithOfferAndOwner={dogWithOfferAndOwner}
                        key={dogWithOfferAndOwner.offerId}
                    />
                ))}
            </div>
        </BasicPage>
    )
}

export default ActiveOffers
