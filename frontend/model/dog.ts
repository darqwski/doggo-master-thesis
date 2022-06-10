import {IBreeding} from "./breeding";
import {IOffer} from "./offer";

export interface IDog {
    dogId: number;
    race: string;
    dogName?: string;
    owner: number;
    birth: string;
    profileImage: string
}

export interface IDogWithOffer extends IDog, IOffer {
}
export interface IDogWithBreedingAndOffer extends IDogWithOffer, IBreeding {
}
export interface IDogWithOfferAndOwner extends IDog, IOffer {
    ownerLogin: string
}