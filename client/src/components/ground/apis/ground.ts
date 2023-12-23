import { baseUrl } from "../../common/apis/common";
import {APIError, Get, Post, Put} from "../../common/axiosFetch";
import { Result } from "../../common/poliTypes";


export enum GroundType {
    ORCHID,
    PEAT,
    ADDITION,
    BONSAI,
    TROPIC,
    DESERT,
    CITRUS,
    OTHER,
}
export type Ground = {
    id: number;
    name: string;
    type: GroundType;
    stockQuantity: number;
    moistureRetention: string;
    imageUrl: string; // Ustawienie typu na string | null, aby obsłużyć przypadki, gdy obrazek jest nullem
};
export type CreateGroundRequest = {
    name: string;
    type: GroundType;
    stockQuantity: number;
    moistureRetention: string;
    imageUrl: string;
    // Other fields required to create a ground
};

export type ModifyGroundRequest = {
    name: string;
    type: GroundType;
    stockQuantity: number;
    moistureRetention: string;
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
        const response =  Post<CreateGroundRequest, APIError<GroundErrors>>(`${baseUrl}/api/v1/grounds/create`, request);
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




