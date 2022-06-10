import React from 'react'
import { IDogWithOfferAndOwner } from '../../model/dog'
import { Button, Card } from 'react-materialize'
import { calculateAge } from '../../utils/dog-utils'
import './offer-card.less'

export interface IOfferCard {
    dogWithOfferAndOwner: IDogWithOfferAndOwner
    edit?: boolean
}

const OfferCard: React.FC<IOfferCard> = ({
    dogWithOfferAndOwner,
    edit,
}) => {
    const { creationDate, race, birth, profileImage, offerId } =
        dogWithOfferAndOwner
    const title = `${race}, ${calculateAge(birth)}`
    const shortDesc = `Do sprzedania pies rasy ${race} w wieku ${calculateAge(
        birth
    )}. Zapraszam do kontaktu`

    return (
        <Card className="offer-card">
            <div className="offer-card__header">
                <div className="offer-card__creation-date">
                    {creationDate}
                </div>
                <div className="offer-card__title">{title}</div>
            </div>
            <div className="offer-card__content">
                <img src={profileImage} className="offer-card__img" />
                <div className="offer-card__short-desc">{shortDesc}</div>
            </div>
            <div className="offer-card__footer">
                {edit && (
                    <a href={`/offer/edit/${offerId}`}>
                        Edytuj ofertę
                    </a>
                )}
                <a href={`/offer/${offerId}`}>
                    Zobacz pełną ofertę
                </a>
            </div>
        </Card>
    )
}

export default OfferCard
