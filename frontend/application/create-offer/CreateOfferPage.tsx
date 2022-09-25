import React, { useState } from 'react'
import BasicPage from '../../components/basic-page/BasicPage'
import { Button, Card, Select } from 'react-materialize'
import useAppRequest from '../../hooks/use-app-request'
import { IDog, IDogWithOffer } from '../../model/dog'
import appRequest from '../../utils/app-request'
import SelectDogTab from './SelectDogTab'
import AddDescriptionTab from './AddDescriptionTab'
import ConfirmTab from './ConfirmTab'
import FinalTab from './FinalTab'

export interface ICreateOfferPage {}

const SELECT_DOG_TAB = 1
const ADD_DESCRIPTION_TAB = 2
const CONFIRM_TAB = 3
const FINAL_TAB = 10

const CreateOfferPage: React.FC = () => {
    const [offerId, setOfferId] = useState<number>()
    const [selectedDogId, setSelectedDogId] = useState<string | undefined>('123')
    const [tab, setTab] = useState(SELECT_DOG_TAB)

    const { data: dogs = [] } = useAppRequest<IDogWithOffer[]>({
        name: 'dogs',
        url: '/API/get-user-dogs',
    })

    const selectedDog = dogs.find(
        (dog) => selectedDogId && dog.dogId === +selectedDogId
    )

    const addDescription = async (
        description: string,
        shortDescription: string
    ) => {
        await appRequest({
            url: '/API/update-offer-description',
            method: 'PUT',
            data: { offerId, shortDescription, description },
        })

        setTab(CONFIRM_TAB)
    }
    const confirmOffer = async () => {
        await appRequest({
            url: '/API/activate-offer',
            method: 'PUT',
            data: { offerId },
        })

        setTab(FINAL_TAB)
    }

    const createOffer = async () => {
        const { data } = await appRequest<{ offerId: number }>({
            url: '/API/create-offer',
            method: 'POST',
            data: { dogId: selectedDogId },
        })

        setOfferId(data.offerId)
        setTab(ADD_DESCRIPTION_TAB)
    }

    return (
        <BasicPage>
            <>
                {tab === SELECT_DOG_TAB && (
                    <SelectDogTab
                        createOffer={createOffer}
                        setSelectedDogId={setSelectedDogId}
                        selectedDogId={selectedDogId}
                        dogs={dogs}
                    />
                )}
                {tab === ADD_DESCRIPTION_TAB && !!selectedDog && (
                    <AddDescriptionTab
                        selectedDogId={selectedDogId}
                        addDescription={addDescription}
                        selectedDog={selectedDog}
                    />
                )}
                {tab === CONFIRM_TAB && (
                    <ConfirmTab
                        confirmOffer={confirmOffer}
                        dogWithOffer={selectedDog}
                    />
                )}
                {tab === FINAL_TAB && <FinalTab offerId={offerId} />}
            </>
        </BasicPage>
    )
}

export default CreateOfferPage
