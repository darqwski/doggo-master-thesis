import React from 'react'
import BasicPage from '../../components/basic-page/BasicPage'
import FeedList from "./components/feed-list/FeedList";

const feedList = [
	{
		type: 'dog-image-post',
		owner: { name: 'Typowy własciciel' },
		dog: {
			name: 'Soju',
			img: '',
		},
		img: {
			src: '/doggo-cute-1.jpeg'
		}

	},
    {
        type: 'dog-reserved',
        dog: {
            race: 'Pomeranian',
            img: '',
            birth: '3 tygodnie temu',
        },
        breeder: { name: 'Podejrzany hodowca' },
		breeding: {name: 'Hodowla pomeranianów', place: 'Kraków' },
	},
	{
		type: 'new-reservation',
		breeder: { name: 'Podejrzany hodowca' },
		breeding: {name: 'Hodowla pomeranianów', place: 'Kraków' },
		dog: {
			race: 'Pomeranian',
			img: '',
			birth: '3 tygodnie temu',
		},
	},
    {
        type: 'new-breed',
        breeder: { name: 'Podejrzany hodowca', place: 'Kraków' },
		breeding: {name: 'Hodowla pomeranianów', place: 'Kraków' },
	},
	{
		type: 'dog-registered',
		owner: { name: 'Typowy własciciel' },
		dog: {
			name: 'Soju',
			img: '',
		},
	},
]

const DashboardPage: React.FC = () => {
    return (
        <BasicPage>
            <div>
                <h2>Ostatnie wydarzenia</h2>
				<FeedList events={feedList} />
            </div>
        </BasicPage>
    )
}

export default DashboardPage
