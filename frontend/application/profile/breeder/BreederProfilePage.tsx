import React from 'react'
import BasicPage from '../../../components/basic-page/BasicPage'
import { Card } from 'react-materialize'
import { useParams } from 'react-router-dom'
import useAppRequest from '../../../hooks/use-app-request'
import { IBreederWithBreedingDogsAndOpinions } from '../../../model/breeder'
import BasicUserInfo from '../common/BasicUserInfo'
import BreedingInfo from "../common/BreedingInfo";
import DogBasicInfo from "../common/DogBasicInfo";
import OpinionView from "../common/OpinionView";

export interface IBreederProfilePage {}

const BreederProfilePage: React.FC = ({}) => {
    const { breederId } = useParams<{ breederId: string }>()
    const { data } = useAppRequest<IBreederWithBreedingDogsAndOpinions>({
        url: `/API/profile/user/${breederId}`,
    })

    return (
        <BasicPage>
            <Card>
                {data ? (
                    <div>
						<h2>Profil użytkownika {data.login}</h2>
						<div className="flex">
							<BasicUserInfo user={data} />
							<div style={{marginLeft: '3rem'}}>
								<h3>Hodowle ({data.breedings.length})</h3>
								{data.breedings.map(breeding=><BreedingInfo breeding={breeding} />)}
							</div>
						</div>
                        <h3>Psy w hodowli {(data.dogs.length)}</h3>
						{data.dogs.map(dog=><DogBasicInfo dog={dog} />)}
						<h3>Opinie o hodowli od klientów</h3>
						{data.opinions.map(opinion=><OpinionView opinion={opinion} />)}
                    </div>
                ) : (
                    <div>Loading</div>
                )}
            </Card>
        </BasicPage>
    )
}

export default BreederProfilePage
