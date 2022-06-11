import React from 'react'
import BasicPage from '../../components/basic-page/BasicPage'
import {Button} from "react-materialize";
import appRequest from "../../utils/app-request";
import {useParams} from "react-router-dom";
import {uploadFile} from "../../utils/upload-file";

export interface IDogGalleryPage {}

const DogEditGallery: React.FC = () => {
    const { dogId } = useParams<{ dogId: string }>()

    const uploadImage:  React.ChangeEventHandler<HTMLInputElement> =async (event) => {
        const { files } = event.target

        if(!files || !files.length){
            return;
        }

       await uploadFile('/API/dog/'+dogId+'/add-photo', files?.[0] )
    }

    return (
        <BasicPage>
            <div>
                <form action="/API/dog/add-photo" method="POST" >
                    <label htmlFor="file">Dodaj zdjęcie</label>
                    <input type="file" id="file" onChange={uploadImage} />
                    <button type="submit">SUBMIT </button>
                </form>
            </div>
        </BasicPage>
    )
}

export default DogEditGallery
