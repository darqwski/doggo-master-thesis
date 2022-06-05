import React, { Dispatch, SetStateAction } from 'react'
import { Button, Card, Select } from 'react-materialize'
import useAppRequest from '../../hooks/use-app-request'
import { IDogWithReservation } from '../../model/dog'

export interface ISelectDogTab {
    setSelectedDogId: Dispatch<SetStateAction<string | undefined>>
    selectedDogId: string | undefined
    dogs: IDogWithReservation[]
    createOffer: () => Promise<void>
}

const SelectDogTab: React.FC<ISelectDogTab> = ({
    setSelectedDogId,
    selectedDogId,
    createOffer,
    dogs,
}) => {
    const filteredDogs = dogs.filter((dog) => !dog.reservationId)

    return (
        <Card>
			<h3>Krok 1. Wybierz psa</h3>
            <div>
                <label htmlFor="select-dog-select">Wybierz psa</label>
                {filteredDogs.length ? (
                    <Select
                        browserDefault={false}
                        id="select-dog-select"
                        value={selectedDogId}
                        onChange={(event) =>
                            setSelectedDogId(event.target.value)
                        }
                    >
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

                {selectedDogId && (
                    <Button onClick={createOffer}>Stwórz ofertę</Button>
                )}
            </div>
        </Card>
    )
}

export default SelectDogTab
