import React, { useContext } from 'react'
import BasicPage from '../../components/basic-page/BasicPage'
import { Button, Card } from 'react-materialize'
import appRequest from '../../utils/app-request'
import { useParams } from 'react-router-dom'
import { uploadFile } from '../../utils/upload-file'
import useAppRequest from '../../hooks/use-app-request'
import './dog-edit-gallery.less'
import { SnackbarContext } from '../../components/snackbar/snackbar-context'

const DogEditGallery: React.FC = () => {
    const { dogId } = useParams<{ dogId: string }>()
    const { addSnackBar } = useContext(SnackbarContext)
    const { data: dogImages, refresh } = useAppRequest<
        { fileUrl: string; fileId: number }[]
    >({ url: ` /API/dog/${dogId}/images` })

    const uploadImage: React.ChangeEventHandler<HTMLInputElement> = async (
        event
    ) => {
        const { files } = event.target

        if (!files || !files.length) {
            return
        }

        await uploadFile('/API/dog/' + dogId + '/add-photo', files?.[0])
    }

    const removeFile = async (fileId: number) => {
        await appRequest({ method: 'DELETE', url: '/API/dog/remove-image/' + fileId })
        addSnackBar({ text: 'Usunięto obrazek' })
        refresh()
    }

    return (
        <BasicPage>
            <div>
                <Card>
                    <h3>Dodaj zdjęcie</h3>
                    <div>
                        <label htmlFor="file">Wybierz plik</label>
                        <input type="file" id="file" onChange={uploadImage} />
                    </div>
                </Card>

                <Card>
                    <h3>Usuń zdjęcia</h3>
                    <div className="dog-images">
                        {dogImages &&
                            dogImages.map((dogImage) => (
                                <div className="dog-image-container">
                                    <img
                                        className="dog-image"
                                        src={dogImage.fileUrl}
                                        alt=""
                                    />
                                    <div>
                                        <Button onClick={()=>removeFile(dogImage.fileId)}>Usuń zdjęcie</Button>
                                    </div>
                                </div>
                            ))}
                    </div>
                </Card>
            </div>
        </BasicPage>
    )
}

export default DogEditGallery
