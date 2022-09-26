import {IUser} from "./user";
import {IOpinion} from "./opinion";
import {IDog} from "./dog";
import {IBreeding} from "./breeding";

export interface IBreeder extends IUser {
}

export interface IBreederWithBreedingDogsAndOpinions extends IBreeder {
    opinions: IOpinion[],
    dogs: IDog[]
    breedings: IBreeding[]
}