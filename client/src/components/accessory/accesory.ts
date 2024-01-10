import { APIError, CheckToken, Delete, Get, Post, Put} from "../common/axiosFetch"
import { Result } from "../common/poliTypes";
import { baseUrl } from "../common/apis/common";
import {CreateGroundRequest, Ground, GroundErrors, ModifyGroundRequest} from "../ground/apis/ground";

export type Accessory = {
    id: number;
    name: string;
    description: string;
    price: number;
    stockQuantity: number;
    category: Category;
    image: string;
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
    image: string;

}

export type ModifyAccessoryRequest = {
    id: number;
    name: string;
    description: string;
    price: number;
    stockQuantity: number;
    category: Category;
    image: string;
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

export const createAccessory= async (request: CreateAccessoryRequest): Promise<Result<Accessory, APIError<AccessoryErrors>>> => {
    const response =  Post<CreateAccessoryRequest, APIError<AccessoryErrors>>(`${baseUrl}/api/v1/admin/accessories/create`, request);
    return response.then((data) => {
        if (data.isOk) {
            return { isOk: true, value: data.value } as Result<Accessory, APIError<AccessoryErrors>>;
        } else {
            return { isOk: false, error: data.error.response?.data } as Result<Accessory, APIError<AccessoryErrors>>;
        }
    });
}


// Update an existing ground
export const updateAccessory= async (request: ModifyAccessoryRequest): Promise<Result<Accessory, APIError<AccessoryErrors>>> => {
    const response = Put<ModifyAccessoryRequest, APIError<AccessoryErrors>>(`${baseUrl}/api/v1/accessories/update`, request);
    return response.then((data) => {
        if (data.isOk) {
            return { isOk: true, value: data.value } as Result<Accessory, APIError<AccessoryErrors>>;
        } else {
            return { isOk: false, error: data.error.response?.data } as Result<Accessory, APIError<AccessoryErrors>>;
        }
    });
}


export const deleteAccessory= async (id: number): Promise<Result<any, APIError<AccessoryErrors>>> => {
    const response = Delete<any, APIError<GroundErrors>>(`${baseUrl}/api/v1/admin/accessories/${id}`);

    return response.then((data) => {
        if (data.isOk) {
            return { isOk: true, value: data.value } as Result<any, APIError<AccessoryErrors>>;
        } else {
            return { isOk: false, error: data.error.response?.data } as Result<any, APIError<AccessoryErrors>>;
        }
    });
}