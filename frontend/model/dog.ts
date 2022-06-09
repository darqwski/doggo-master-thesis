import {IReservation} from "./reservation";
import {IBreeding} from "./breeding";

export interface IDog {
    dogId: number;
    race: string;
    dogName?: string;
    owner: number;
    birth: string;
    profileImage: string
}

export interface IDogWithReservation extends IDog, IReservation {
}
export interface IDogWithBreedingAndReservation extends IDogWithReservation, IBreeding {
}
export interface IDogWithReservationAndOwner extends IDog, IReservation {
    ownerLogin: string
}