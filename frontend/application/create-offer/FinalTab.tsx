import React from 'react'
import {Card} from "react-materialize";

export interface IFinalTab {
    offerId: number | undefined
}

const FinalTab: React.FC<IFinalTab> = ({ offerId }) => {
    return (
        <Card>
            <h3>Oferta wystawiona pomyślnie</h3>
            <p>Oferta jest widoczna dla innych użytkowinków pod linkiem: </p>
            <p>
                <a href={`/active-offers/${offerId}`}>
                    doggo.com/active-offers/{offerId}
                </a>
            </p>
            <p>
                Możesz edytować ofertę wchodząc w Menu Główne {'>>'} Psy {'>>'}
                Moje ogłoszenia lub pod linkiem
            </p>
            <p>
                <a href={`/offer/edit/${offerId}`}>
                    doggo.com/offer/edit/{offerId}
                </a>
            </p>
			<p>Zostaniesz poinformowany mailowo kiedy zgłosi się kupiec oraz w aplikacji</p>
        </Card>
    )
}

export default FinalTab
