import React from 'react'
import { IFeedEvent } from '../../../../model/feed'
import FeedItem from './feed-item/FeedItem'

export interface IFeedList {
    events: IFeedEvent[]
}

const FeedList: React.FC<IFeedList> = ({ events }) => {
    return (
        <div>
            {events.map((event) => (
                <FeedItem event={event} />
            ))}
        </div>
    )
}

export default FeedList
