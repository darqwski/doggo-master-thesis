import React from 'react';
import {IOpinion} from "../../../model/opinion";
import {calculateAge} from "../../../utils/dog-utils";

export interface IOpinionView {
	opinion: IOpinion
}

const OpinionView: React.FC<IOpinionView> = ({opinion}) => {
    return <div className={!!opinion.opinionPositivity ? "card green lighten-4" : 'card orange lighten-4'} style={{padding:'1rem', marginTop:'2rem'}}>
		<p style={{textAlign:'right', fontWeight: "bold", fontSize:'0.8rem'}}>
			{calculateAge(opinion.opinionDate)}
		</p>
		<div className="flex">
			<div style={{flexGrow:1}}>{opinion.opinionText}</div>
			<h5>
				{!!opinion.opinionPositivity ? '+1' : '-1'}
			</h5>
		</div>
	</div>;
};

export default OpinionView;