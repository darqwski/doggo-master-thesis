import React from 'react';
import {IBreeding} from "../../../model/breeding";

export interface IBreedingInfo {
 breeding: IBreeding
}

const BreedingInfo: React.FC<IBreedingInfo> = ({ breeding}) => {
    return <div>
		<div className="value-desc">
			<div className="desc">Nazwa</div>
			<div className="value">{breeding.name}</div>
		</div>
		<div className="value-desc">
			<div className="desc">Adres</div>
			<div className="value">{breeding.address}</div>
		</div>
	</div>;
};

export default BreedingInfo;