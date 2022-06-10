import React from 'react'
import { IFeedList } from '../FeedList'
import { IFeedEvent } from '../../../../../model/feed'
import { Card } from 'react-materialize'
import { calculateAge } from '../../../../../utils/dog-utils'

export interface IFeedItem {
    event: IFeedEvent
}

const FeedItem: React.FC<IFeedItem> = ({ event }) => {
    const { type, dog, breeder, breeding, owner, vet, img } = event
    const getText = () => {
        if (type === 'new-offer') {
            return (
                <div style={{ display: 'flex' }}>
                    <img
                        style={{ maxWidth: '100%', maxHeight: '10rem' }}
                        src={dog?.profileImage || '/img/doggo-calm-1.jpeg'}
                    />
                    <div style={{ padding: '1rem' }}>
                        <p>
                            Hodowca <strong>{breeder?.firstName}</strong>{' '}
                            wystawia psa rasy {dog?.race} w hodowli{' '}
                            {breeding?.name} w {breeding?.address}.
                        </p>
                        <p>Pies ma {calculateAge(dog?.birth)}</p>
                    </div>
                </div>
            )
        }
        if (type === 'dog-bought') {
            return (
                <div style={{ display: 'flex' }}>
                    <img
                        style={{ maxWidth: '100%', maxHeight: '10rem' }}
                        src={dog?.profileImage || '/img/doggo-calm-1.jpeg'}
                    />
                    <div style={{ padding: '1rem' }}>
                        <p>
                            Pies rasy <strong>{dog?.race}</strong> został
                            kupiony w hodowoli
                            <strong>{breeding?.name}</strong> w{' '}
                            <strong>{breeding?.address}</strong>.
                        </p>
                    </div>
                </div>
            )
        }
        if (type === 'dog-image-post') {
            return (
                <div style={{ display: 'flex' }}>
                    <img
                        style={{ maxWidth: '100%', maxHeight: '10rem' }}
                        src={img?.src || '/img/doggo-calm-1.jpeg'}
                    />
                    <div style={{ padding: '1rem' }}>
                        <p>
                            <strong>{owner?.firstName}</strong> wstawił nowe
                            zdjęcia swojego psa <strong>{dog?.dogName}</strong> .
                        </p>
                    </div>
                </div>
            )
        }
        if (type === 'new-breed') {
            return (
                <div style={{ display: 'flex' }}>
                    <img
                        style={{ maxWidth: '100%', maxHeight: '10rem' }}
                        src={img?.src || '/img/doggo-calm-1.jpeg'}
                    />
                    <div style={{ padding: '1rem' }}>
                        <p>
                            Hodowca <strong>{breeder?.firstName}</strong>
                            rejestruje nowego psa rasy {dog?.race} w hodowli
                            {breeding?.name} w {breeding?.address}.
                        </p>
                    </div>
                </div>
            )
        }
        if (type === 'dog-registered') {
            return (
                <div style={{ display: 'flex' }}>
                    <img
                        style={{ maxWidth: '100%', maxHeight: '10rem' }}
                        src={img?.src || '/img/doggo-calm-1.jpeg'}
                    />
                    <div style={{ padding: '1rem' }}>
                        <p>
                            <strong>{owner?.firstName}</strong> dodaje nowego
                            psa, który wabi się <strong>{dog?.dogName}</strong>.
                        </p>
                        <p>
                            {' '}
                            Pies ma <strong>
                                {calculateAge(dog?.birth)}
                            </strong>{' '}
                            i jest rasy <strong>{dog?.race}</strong>.
                        </p>
                    </div>
                </div>
            )
        }
        return type
    }
    return (
        <Card>
            <div>{getText()}</div>
        </Card>
    )
}

export default FeedItem
