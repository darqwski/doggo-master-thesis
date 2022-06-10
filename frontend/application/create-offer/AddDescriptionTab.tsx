import React, { useState } from 'react'
import { IDogWithOffer } from '../../model/dog'
import {Button, Card} from 'react-materialize'

export interface IAddDescriptionTab {
    selectedDog: IDogWithOffer | undefined
    selectedDogId: string | undefined
    addDescription: (
        description: string,
        shortDescription: string
    ) => Promise<void>
}

const AddDescriptionTab: React.FC<IAddDescriptionTab> = ({
    selectedDog,
    selectedDogId,
    addDescription,
}) => {
    const [shortDescription, setShortDescription] = useState('')
    const [description, setDescription] = useState('')

    if (!selectedDog) {
        throw 'Dog does not exist'
    }

    return (
        <Card>
			<h3>Krok 2. Dodaj opis psa</h3>
            <div>
                <img src={selectedDog.profileImage} />
            </div>
            <div>
                <label>Krótki opis, widoczny na tablicy ogłoszeń</label>
                <textarea
                    value={shortDescription}
                    onChange={(event) =>
                        setShortDescription(event.target.value)
                    }
                />
            </div>
            <div>
                <label>Dłuższy opis, widoczny po wejściu w ofertę</label>
                <textarea
                    value={description}
                    onChange={(event) => setDescription(event.target.value)}
                />
            </div>
            {selectedDogId && (
                <Button
                    onClick={() =>
                        addDescription(shortDescription, description)
                    }
                >
                    Dodaj opis
                </Button>
            )}
        </Card>
    )
}

export default AddDescriptionTab
