import React from 'react'
import { IDogWithReservationAndOwner } from '../../model/dog'
import { Button, Card } from 'react-materialize'
import { calculateAge } from '../../utils/dog-utils'
import './reservation-card.less'

export interface IReservationCard {
    dogWithReservationAndOwner: IDogWithReservationAndOwner
}

const ReservationCard: React.FC<IReservationCard> = ({
    dogWithReservationAndOwner,
}) => {
    const { creationDate, race, birth, profileImage, reservationId } =
        dogWithReservationAndOwner
    const title = `${race}, ${calculateAge(birth)}`
    const shortDesc = `Do sprzedania pies rasy ${race} w wieku ${calculateAge(
        birth
    )}. Zapraszam do kontaktu`

    return (
        <Card className="reservation-card">
            <div className="reservation-card__header">
                <div className="reservation-card__creation-date">
                    {creationDate}
                </div>
                <div className="reservation-card__title">{title}</div>
            </div>
            <div className="reservation-card__content">
                <img src={profileImage} className="reservation-card__img" />
                <div className="reservation-card__short-desc">{shortDesc}</div>
            </div>
            <div className="reservation-card__footer">
                <a href={`/active-reservation/${reservationId}`}>
                    Zobacz pełną ofertę
                </a>
            </div>
        </Card>
    )
}

export default ReservationCard
