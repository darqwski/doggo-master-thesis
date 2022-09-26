import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import BasicPage from '../../../components/basic-page/BasicPage'
import appRequest from '../../../utils/app-request'

export interface IAddOpinionPage {}

const AddOpinionPage: React.FC = () => {
    const { breederId } = useParams<{ breederId: string }>()
    const [opinionText, setOpinionText] = useState('')
    const [opinionPositivity, setOpinionPositivity] = useState<boolean>()

    const sendOpinion = async () => {
        await appRequest({
            url: '/API/add-opinion',
            data: {
                receiverId: breederId,
                text: opinionText,
                positivity: opinionPositivity ? 1 : 0,
            },
            method: 'POST',
        })
            .then((result) => {
                window.location.href = '../' + breederId
            })
            .catch((e) => {
                console.log(e)
            })
    }
    return (
        <BasicPage>
            <form onSubmit={sendOpinion}>
                <h3>Wystawianie opinii hodowli</h3>
                <p>
                    Czy oceniasz hodowlę pozytywnie?
                    <button
                        disabled={opinionPositivity}
                        onClick={() => setOpinionPositivity(true)}
                        className="btn green darken-2 white-text"
                    >
                        TAK
                    </button>
                    <button
                        disabled={opinionPositivity === false}
                        onClick={() => setOpinionPositivity(false)}
                        className="btn red darken-2 white-text"
                    >
                        NIE
                    </button>
                </p>
                <textarea
                    onChange={(event) => setOpinionText(event.target.value)}
                />
                <button className="btn">Zatwierdź</button>
            </form>
        </BasicPage>
    )
}

export default AddOpinionPage
