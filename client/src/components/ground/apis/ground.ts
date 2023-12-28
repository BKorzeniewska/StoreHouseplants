import { baseUrl } from "../../common/apis/common";
import {APIError, Delete, Get, Post, Put} from "../../common/axiosFetch";
import { Result } from "../../common/poliTypes";
import * as string_decoder from "string_decoder";
import {ArticleErrors} from "../../blog/article/apis/article";


export enum GroundType {
    DESERT = 'DESERT',
    CITRUS = 'CITRUS',
    ORCHID = 'ORCHID',
    BONSAI = 'BONSAI',
    PEAT = 'PEAT',
    ADDITION = 'ADDITION',
    PERMEABLE = 'PERMEABLE',
    UNIVERSAL = 'UNIVERSAL',
    OTHER = 'OTHER',
}
export type Ground = {
    id: number;
    name: string;
    type: GroundType;
    stockQuantity: number;
    price: number;
    description: string;
    imageUrl: string; // Ustawienie typu na string | null, aby obsłużyć przypadki, gdy obrazek jest nullem
};
export type CreateGroundRequest = {
    name: string;
    type: GroundType;
    stockQuantity: number;
    price: number;
    description: string;
    imageUrl: string;
    // Other fields required to create a ground
};

export type ModifyGroundRequest = {
    name: string;
    type: GroundType;
    stockQuantity: number;
    price: number;
    description: string;
    imageUrl: string;
    // Other fields required to update a ground
};


export type GroundErrors = string;


export const loadGrounds = async (): Promise<Result<Ground[], APIError<GroundErrors>>> => {
    const response = Get<Ground[], APIError<GroundErrors>>(`${baseUrl}/api/v1/grounds/all`);


    return response.then((data) => {
        if (data.isOk) {
            return {isOk: true, value: data.value} as Result<Ground[], APIError<GroundErrors>>;
        } else {
            return {isOk: false, error: data.error.response?.data} as Result<Ground[], APIError<GroundErrors>>;
        }
    });
};
export const getGroundById = async (id: number): Promise<Result<Ground, APIError<GroundErrors>>> => {
    const response =  Get<Ground, APIError<GroundErrors>>(`${baseUrl}/api/v1/grounds/${id}`);
    return response.then((data) => {
        if (data.isOk) {
            return { isOk: true, value: data.value } as Result<Ground, APIError<GroundErrors>>;
        } else {
            return { isOk: false, error: data.error.response?.data } as Result<Ground, APIError<GroundErrors>>;
        }
    });
};

// Create a new ground
    export const createGround = async (request: CreateGroundRequest): Promise<Result<Ground, APIError<GroundErrors>>> => {
        const response =  Post<CreateGroundRequest, APIError<GroundErrors>>(`${baseUrl}/api/admin/v1/grounds/create`, request);
        return response.then((data) => {
            if (data.isOk) {
                return { isOk: true, value: data.value } as Result<Ground, APIError<GroundErrors>>;
            } else {
                return { isOk: false, error: data.error.response?.data } as Result<Ground, APIError<GroundErrors>>;
            }
        });
    }


// Update an existing ground
export const updateGround = async (request: ModifyGroundRequest): Promise<Result<Ground, APIError<GroundErrors>>> => {
    const response = Put<ModifyGroundRequest, APIError<GroundErrors>>(`${baseUrl}/api/v1/grounds/update`, request);
    return response.then((data) => {
        if (data.isOk) {
            return { isOk: true, value: data.value } as Result<Ground, APIError<GroundErrors>>;
        } else {
            return { isOk: false, error: data.error.response?.data } as Result<Ground, APIError<GroundErrors>>;
        }
    });
}

export const loadGroundsByType = async (type: string): Promise<Result<Ground[], APIError<GroundErrors>>> => {
    const response = Get<Ground[], APIError<GroundErrors>>(`${baseUrl}/api/v1/grounds/type/${type}`);


    return response.then((data) => {
        if (data.isOk) {
            return {isOk: true, value: data.value} as Result<Ground[], APIError<GroundErrors>>;
        } else {
            return {isOk: false, error: data.error.response?.data} as Result<Ground[], APIError<GroundErrors>>;
        }
    });
};

export const deleteGround = async (groundId: number): Promise<Result<any, APIError<GroundErrors>>> => {
    const response = Delete<any, APIError<GroundErrors>>(`${baseUrl}/api/v1/ground/${groundId}`);

    return response.then((data) => {
        if (data.isOk) {
            return { isOk: true, value: data.value } as Result<any, APIError<GroundErrors>>;
        } else {
            return { isOk: false, error: data.error.response?.data } as Result<any, APIError<GroundErrors>>;
        }
    });
}

