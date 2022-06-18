import React from 'react'
import useAppRequest from '../../hooks/use-app-request'
import { useParams } from 'react-router-dom'
import { Card, Preloader } from 'react-materialize'
import { IDogWithBreeding } from '../../model/dog'
import { calculateAge } from '../../utils/dog-utils'
import BasicPage from '../../components/basic-page/BasicPage'
import DogGalleryItem from './DogGalleryItem'

const DogGalleryPage: React.FC = () => {
    const { dogId } = useParams<{ dogId: string }>()

    const { data: dogImages } = useAppRequest<
        { fileUrl: string; fileId: number; uploadDatetime: string }[]
    >({ url: ` /API/dog/${dogId}/images` })
    const { data: dogInfo } = useAppRequest<IDogWithBreeding>({
        url: ` /API/dog-info/${dogId}`,
    })

    return (
        <BasicPage>
            {dogInfo ? (
                <div>
                    <Card>
                        <h3>{dogInfo.dogName || dogInfo.race}</h3>
                        <div>
                            <div className="value-desc">
                                <div className="desc">Rasa</div>
                                <div className="value">{dogInfo.race}</div>
                            </div>
                            <div className="value-desc">
                                <div className="desc">Wiek</div>
                                <div className="value">
                                    {calculateAge(dogInfo.birth)}
                                </div>
                            </div>
                            <div className="value-desc">
                                <div className="desc">Pochodzenie</div>
                                <div className="value">
                                    {dogInfo.name} - {dogInfo.address}
                                </div>
                            </div>
                        </div>
                    </Card>
                    {dogImages?.map((dogImage) => (
                        <DogGalleryItem
                            key={dogImage.fileId}
                            dogImage={dogImage}
                        />
                    ))}
                </div>
            ) : (
                <Preloader />
            )}
        </BasicPage>
    )
}

export default DogGalleryPage
