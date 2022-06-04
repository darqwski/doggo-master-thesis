import React, { useState } from 'react'
import BasicPage from '../../components/basic-page/BasicPage'
import {Button, Card, Select} from 'react-materialize'
import useAppRequest from '../../hooks/use-app-request'
import { IDog, IDogWithReservation } from '../../model/dog'
import appRequest from "../../utils/app-request";

export interface ICreateOfferPage {}

const CreateOfferPage: React.FC = () => {
    const { data = [] } = useAppRequest<IDogWithReservation[]>({
        method: 'POST',
        url: '/API/get-user-dogs',
    })
    const filteredDogs = data.filter((dog) => !dog.reservationId)
    const [selectedDog, setSelectedDog] = useState<string | undefined>()

    const createOffer =async () => {
       await appRequest({url: '/API/create-offer', method: 'POST', data: { dogId: selectedDog }})
    }
    return (
        <BasicPage>
            <Card>
                <h3>Wystawianie psa</h3>
                <div>
                    <label htmlFor="select-dog-select">Wybierz psa</label>
                    {filteredDogs.length ? (
                        <Select browserDefault={false} id="select-dog-select" value={selectedDog} onChange={event=>setSelectedDog(event.target.value)}>
                            <option value={undefined}>Wybierz psa</option>
                            {filteredDogs.map((filteredDog) => (
                                <option
                                    key={`filtered-dog-${filteredDog.dogId}`}
                                    value={filteredDog.dogId}
                                >
                                    {filteredDog.dogName || filteredDog.race}
                                </option>
                            ))}
                        </Select>
                    ) : (
                        <p> Wszystkie psy są już wystawione</p>
                    )}

                    {selectedDog && (
                        <Button onClick={createOffer}>Stwórz ofertę</Button>
                    )}
                </div>
            </Card>
        </BasicPage>
    )
}

export default CreateOfferPage
