import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import BasicPage from '../../components/basic-page/BasicPage'
import useAppRequest from '../../hooks/use-app-request'
import { Button, Card } from 'react-materialize'
import { IOffer } from '../../model/offer'
import './edit-offer.less'
import appRequest from '../../utils/app-request'

export interface IEditOfferPage {}

const EditOfferPage: React.FC = () => {
    const { offerId } = useParams<{ offerId: string }>()
    const [shortDescription, setShortDescription] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState('')
    const { data } = useAppRequest<{ offer: IOffer }>({
        url: `/API/offer/${offerId}`,
    })

    const updateOffer = async () => {
        await appRequest({
            url: '/API/offer/' + offerId,
            method: 'PUT',
            data: { shortDescription, description, price}
        })
    }

    useEffect(() => {
        if (!data) {
            return
        }

        setShortDescription(data.offer.shortDescription)
        setDescription(data.offer.description)
        setPrice(data.offer.price)
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
                        className="edit-offer__textarea"
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
                        className="edit-offer__textarea"
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
                    <Button onClick={updateOffer}>Zapisz zmiany</Button>
                    <Button flat><a href="/my-offers">Anuluj</a></Button>
                </div>
            </Card>
        </BasicPage>
    )
}

export default EditOfferPage
