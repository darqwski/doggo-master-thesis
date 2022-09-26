import React from 'react'
import { IDog } from '../../../model/dog'
import { calculateAge } from '../../../utils/dog-utils'

export interface IDogBasicInfo {
    dog: IDog
}

const DogBasicInfo: React.FC<IDogBasicInfo> = ({ dog }) => {
    return (
        <div className="card yellow lighten-4" style={{padding:'1rem'}}>
            {dog.dogName && (
                <div className="value-desc">
                    <div className="desc">Imię psa</div>
                    <div className="value">{dog.dogName}</div>
                </div>
            )}
            <div className="value-desc">
                <div className="desc">Wiek</div>
                <div className="value">{calculateAge(dog.birth)}</div>
            </div>
            <div className="value-desc">
                <div className="desc">Rasa</div>
                <div className="value">{dog.race}</div>
            </div>
        </div>
    )
}

export default DogBasicInfo
