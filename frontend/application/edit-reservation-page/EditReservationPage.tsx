import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import BasicPage from '../../components/basic-page/BasicPage'
import useAppRequest from '../../hooks/use-app-request'
import { Button, Card } from 'react-materialize'
import { IReservation } from '../../model/reservation'
import './edit-reservation.less'
import appRequest from '../../utils/app-request'

export interface IEditReservationPage {}

const EditReservationPage: React.FC = () => {
    const { reservationId } = useParams<{ reservationId: string }>()
    const [shortDescription, setShortDescription] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState('')
    const { data } = useAppRequest<{ reservation: IReservation }>({
        url: `/API/reservation/${reservationId}`,
    })

    const updateReservation = async () => {
        await appRequest({
            url: '/API/reservation/' + reservationId,
            method: 'PUT',
            data: { shortDescription, description, price}
        })
    }

    useEffect(() => {
        if (!data) {
            return
        }

        setShortDescription(data.reservation.shortDescription)
        setDescription(data.reservation.description)
        setPrice(data.reservation.price)
    }, [data])
    return (
        <BasicPage>
            <Card style={{ width: '100%' }}>
                <h3>Edycja oferty</h3>
                <div>
                    <label>Krótki opis (widoczny na tablicy ogłoszeń)</label>
                    <textarea
                        cols={80}
                        rows={10}
                        className="edit-reservation__textarea"
                        value={shortDescription}
                        onChange={(event) =>
                            setShortDescription(event.target.value)
                        }
                    />
                </div>
                <div>
                    <label>Opis (widoczny po wejściu w ofertę)</label>
                    <textarea
                        cols={80}
                        rows={10}
                        className="edit-reservation__textarea"
                        value={description}
                        onChange={(event) => setDescription(event.target.value)}
                    />
                </div>
                <div>
                    <label>Cena</label>
                    <input
                        value={price}
                        type="number"
                        onChange={(event) => setPrice(event.target.value)}
                    />
                </div>
                <div>
                    <Button onClick={updateReservation}>Zapisz zmiany</Button>
                    <Button flat><a href="/my-offers">Anuluj</a></Button>
                </div>
            </Card>
        </BasicPage>
    )
}

export default EditReservationPage
