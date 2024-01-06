import { baseUrl } from "../../common/apis/common";
import {APIError, Delete, Get, Post} from "../../common/axiosFetch";
import { Result } from "../../common/poliTypes";

export type Product = {
    id: number;
    name: string;
    price: number;
    count: number;
    kind: Kind;
    image: string | null;
};
export enum Kind {
    PLANT = 'PLANT',
    ACCESSORY = 'ACCESSORY',
    GROUND = 'GROUND',
}