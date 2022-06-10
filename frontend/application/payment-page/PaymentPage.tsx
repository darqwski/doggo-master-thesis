import React, {useContext} from 'react'
import BasicPage from '../../components/basic-page/BasicPage'
import useAppRequest from '../../hooks/use-app-request'
import {Button} from "react-materialize";
import {IUser} from "../../model/user";
import {useParams} from "react-router-dom";
import {IOffer} from "../../model/offer";
import {IDog} from "../../model/dog";
import {IBreeding} from "../../model/breeding";
import {calculateAge} from "../../utils/dog-utils";
import appRequest from "../../utils/app-request";
import {SnackbarContext} from "../../components/snackbar/snackbar-context";

const PaymentPage: React.FC = () => {
	const { offerId } = useParams<{ offerId: string }>()
	const { addSnackBar } = useContext(SnackbarContext)
	const { data: userData } = useAppRequest<IUser>({ url: '/API/user' })

	const { data: offerData } = useAppRequest<{
		offer: IOffer,
		dog: IDog,
		breeding: IBreeding,
		owner: IUser
	}>({ url: `/API/offer/${offerId}` })

	const startPayment = async () => {
		await appRequest({url: '/API/buy-dog', data: { offerId }, method: 'POST'})
		addSnackBar({ text: 'Płatność została przyjęta '})
		location.href = `/dashboard`
	}

	return (
        <BasicPage>
            <div className="payment-page">
                <div className="payment-page__section">
                    <div className="payment-page__section-title">
                        Informacje o psie
                    </div>
					<div className="payment-page__section-container">
						<div className="value-desc">
							<div className="desc">Wiek</div>
							<div className="value">{calculateAge(offerData?.dog.birth)}</div>
						</div>
						<div className="value-desc">
							<div className="desc">Rasa</div>
							<div className="value">{offerData?.dog.race}</div>
						</div>
						<div className="value-desc">
							<div className="desc">Hodowla</div>
							<div className="value">{offerData?.breeding.name} - {offerData?.breeding.address}</div>
						</div>
						<div className="value-desc">
							<div className="desc">Hodowca</div>
							<div className="value">{offerData?.owner.firstName} {offerData?.owner.lastName}</div>
						</div>
					</div>
                </div>
                <div className="payment-page__section">
                    <div className="payment-page__section-title">
                        Dane osobowe użytkownika
                    </div>
					<div className="payment-page__section-container">
						<div className="value-desc">
							<div className="desc">Imię i nazwisko</div>
							<div className="value">{userData?.firstName} {userData?.lastName}</div>
						</div>
						<div className="value-desc">
							<div className="desc">Email</div>
							<div className="value">{userData?.email}</div>
						</div>
						<div className="value-desc">
							<div className="desc">Adres</div>
							<div className="value">{userData?.address}</div>
						</div>
					</div>
                </div>
                <div className="payment-page__section">
                    <div className="payment-page__section-title">
                        Wybór płatności
                    </div>
                </div>
                <div className="payment-page__section">
                    <div className="payment-page__section-title">
                        Podsumowanie
                    </div>

					<Button onClick={startPayment}>Zapłać</Button>
                </div>
            </div>
        </BasicPage>
    )
}

export default PaymentPage
