import {IReservation} from "./reservation";

export interface IDog {
    dogId: string;
    race: string;
    dogName?: string;
    owner: number;
    birth: string;
    profileImage: string
}

export interface IDogWithReservation extends IDog, IReservation {
}
export interface IDogWithReservationAndOwner extends IDog, IReservation {
    ownerLogin: string
}