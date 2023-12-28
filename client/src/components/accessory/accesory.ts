import { APIError, CheckToken, Delete, Get, Post, Put} from "../common/axiosFetch"
import { Result } from "../common/poliTypes";
import { baseUrl } from "../common/apis/common";
import {Chapter, ChapterErrors} from "../blog/chapter/chapter";

export type Accessory = {
    id: number;
    name: string;
    description: string;
    price: number;
    stockQuantity: number;
    category: Category;
    imageUrl: string;
}

export enum Category {
    POTS = 'POTS',
    FLOWERBEDS = 'FLOWERBEDS',
    SUPPORTS = 'SUPPORTS',
    MOISTURE_INDICATORS = 'MOISTURE_INDICATORS',
    WATERING_CANS = 'WATERING_CANS',
    TOOLS = 'TOOLS',
    LAMPS = 'LAMPS',
    FERTILIZERS = 'FERTILIZERS'
}


export type CreateAccessoryRequest = {
    name: string;
    description: string;
    price: number;
    stockQuantity: number;
    category: Category;
    imageUrl: string;

}

export type ModifyAccessoryRequest = {
    name: string;
    description: string;
    price: number;
    stockQuantity: number;
    category: Category;
    imageUrl: string;
}

export type AccessoryErrors = string;
export const loadAccessoryById = async (id: string): Promise<Result<Accessory, APIError<AccessoryErrors>>> => {
    const response = Get<Accessory, APIError<AccessoryErrors>>(`${baseUrl}/api/v1/accessories/${id}`);

    return response.then((data) => {
        if (data.isOk) {
            return { isOk: true, value: data.value } as Result<Accessory, APIError<AccessoryErrors>>;
        } else {
            return { isOk: false, error: data.error.response?.data } as Result<Accessory, APIError<AccessoryErrors>>;
        }
    });
}

export const loadAllAccessories= async (): Promise<Result<Accessory[], APIError<AccessoryErrors>>> => {
    const response = Get<Accessory[], APIError<AccessoryErrors>>(`${baseUrl}/api/v1/accessories/all`);
    return response.then((data) => {
        if (data.isOk) {
            return {isOk: true, value: data.value} as Result<Accessory[], APIError<AccessoryErrors>>;
        } else {
            return {isOk: false, error: data.error.response?.data} as Result<Accessory[], APIError<AccessoryErrors>>;
        }
    });
}

export const loadAccessoriesByCategory= async (category: string): Promise<Result<Accessory[], APIError<AccessoryErrors>>> => {
    const response = Get<Accessory[], APIError<AccessoryErrors>>(`${baseUrl}/api/v1/accessories/category/${category}`);
    return response.then((data) => {
        if (data.isOk) {
            return {isOk: true, value: data.value} as Result<Accessory[], APIError<AccessoryErrors>>;
        } else {
            return {isOk: false, error: data.error.response?.data} as Result<Accessory[], APIError<AccessoryErrors>>;
        }
    });
}