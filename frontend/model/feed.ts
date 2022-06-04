import {IDog} from "./dog";
import {IBreeder} from "./breeder";
import {IBreeding} from "./breeding";
import {IOwner} from "./owner";
import {IVet} from "./vet";

export interface IFeedEvent {
    type: string;
    dog?: IDog;
    breeder?: IBreeder;
    breeding?: IBreeding;
    owner?: IOwner;
    vet?: IVet;
    img?: {
        src: string
    }
}