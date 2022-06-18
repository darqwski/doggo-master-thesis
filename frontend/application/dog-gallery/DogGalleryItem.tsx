import React from 'react';
import {Card} from "react-materialize";

export interface IDogGalleryItem {
	dogImage: { fileUrl: string; fileId: number, uploadDatetime: string }
}

const DogGalleryItem: React.FC<IDogGalleryItem> = ({dogImage}) => {
    return <Card>
		<img src={dogImage.fileUrl} />
	</Card>;
};

export default DogGalleryItem;