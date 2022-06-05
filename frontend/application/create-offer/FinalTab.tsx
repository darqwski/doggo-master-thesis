import React from 'react'
import {Card} from "react-materialize";

export interface IFinalTab {
    reservationId: number | undefined
}

const FinalTab: React.FC<IFinalTab> = ({ reservationId }) => {
    return (
        <Card>
            <h3>Oferta wystawiona pomyślnie</h3>
            <p>Oferta jest widoczna dla innych użytkowinków pod linkiem: </p>
            <p>
                <a href={`/active-reservation/${reservationId}`}>
                    doggo.com/active-reservation/{reservationId}
                </a>
            </p>
            <p>
                Możesz edytować ofertę wchodząc w Menu Główne {'>>'} Psy {'>>'}
                Moje ogłoszenia lub pod linkiem
            </p>
            <p>
                <a href={`/reservation/edit/${reservationId}`}>
                    doggo.com/reservation/edit/{reservationId}
                </a>
            </p>
			<p>Zostaniesz poinformowany mailowo kiedy zgłosi się kupiec oraz w aplikacji</p>
        </Card>
    )
}

export default FinalTab
