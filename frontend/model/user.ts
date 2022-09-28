import {IOpinion} from "./opinion";

export interface IUser {
    firstName?: string;
    lastName?: string;
    address?: string;
    login: string;
    email: string;
    type: string
}

export interface IUserWithAdminData extends IUser {
    dogsAmount: number
    givenOpinions: number
    login: string
    receivedOpinions: number
    type: string
    userId: number
}