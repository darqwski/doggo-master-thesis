import React from 'react'
import { useParams } from 'react-router-dom'
import BasicPage from '../../components/basic-page/BasicPage'
import useAppRequest from '../../hooks/use-app-request'
import {Button, Card} from "react-materialize";
import {IDog, IDogWithOfferAndOwner} from "../../model/dog";
import {IOffer} from "../../model/offer";
import {IBreeding} from "../../model/breeding";
import {IUser} from "../../model/user";
import './offer-page.less';

const OfferPage: React.FC = () => {
    const { offerId } = useParams<{ offerId: string }>()
    const { data } = useAppRequest<{
    	offer: IOffer,
		dog: IDog,
		breeding: IBreeding,
		owner: IUser
	}>({ url: `/API/offer/${offerId}` })

	const { offer, breeding, owner, dog } = data || {}


    return (
        <BasicPage>
            <Card>
				<div className="offer__section">
					<h3 className="offer__section-title">
						Dane rezerwacji
					</h3>
					<div className="offer__section-content">
						<div className="value-desc">
							<div className="desc">Data utworzenia</div>
							<div className="value">{offer?.creationDate}</div>
						</div>
						<div className="value-desc">
							<div className="desc">Status rezerwacji</div>
							<div className="value">{offer?.status === 'created' ? 'Otwarta' : 'Zakończona'}</div>
						</div>
					</div>
				</div>
				<div className="offer__section">
					<h3 className="offer__section-title">
						Dane hodowli
					</h3>
					<div className="value-desc">
						<div className="desc">Nazwa hodowli</div>
						<div className="value">{breeding?.name}</div>
					</div>
					<div className="value-desc">
						<div className="desc">Adres hodowli</div>
						<div className="value">{breeding?.address}</div>
					</div>
					<div className="value-desc">
						<div className="desc">Właściciel hodowli</div>
						<div className="value">{owner?.login}</div>
					</div>
				</div>
				<div className="offer__section">
					<h3 className="offer__section-title">
						Opis psa
					</h3>
					<div className="offer__section-description-container">
						<img className="offer__section-description-image" src={dog?.profileImage} />
						<div className="offer__section-description-text">
							{offer?.description || offer?.shortDescription}
						</div>
					</div>
				</div>
				<div className="offer__section">
					<h3 className="offer__section-title">
						Cena
					</h3>
					<div className="offer__section-content">
						<span className="offer__section-price">{offer?.price} zł</span>
					</div>
					<div className="offer__section-buttons">
						<Button node="a" href={`/offer/${offerId}/payment`}>Biere</Button>
						<a href="/dogs/for-sale">Nie tego szukam</a>

					</div>
				</div>
			</Card>
        </BasicPage>
    )
}

export default OfferPage
