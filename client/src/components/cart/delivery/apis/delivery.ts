import { baseUrl} from "../../../common/apis/common";
import {APIError, Delete, Get, Post, Put} from "../../../common/axiosFetch";
import { Result} from "../../../common/poliTypes";

export type Delivery = {
    id: number;
    name: string;
    price: number;
    description: string;
    blocked: boolean;
};
export type CreateDeliveryRequest = {

    name: string;
    price: number;
    description: string;
    blocked: boolean;
};

export type ModifyDeliveryRequest = {
    id: number;
    name: string;
    price: number;
    description: string;
    blocked: boolean;

};


export type DeliveryErrors = string;


export const loadDeliverys = async (): Promise<Result<Delivery[], APIError<DeliveryErrors>>> => {
    const response = Get<Delivery[], APIError<DeliveryErrors>>(`${baseUrl}/api/v1/deliveries/all`);


    return response.then((data) => {
        if (data.isOk) {
            return {isOk: true, value: data.value} as Result<Delivery[], APIError<DeliveryErrors>>;
        } else {
            return {isOk: false, error: data.error.response?.data} as Result<Delivery[], APIError<DeliveryErrors>>;
        }
    });
};
export const loadDeliveryById = async (id: string): Promise<Result<Delivery, APIError<DeliveryErrors>>> => {
    const response =  Get<Delivery, APIError<DeliveryErrors>>(`${baseUrl}/api/v1/deliveries/${id}`);
    return response.then((data) => {
        if (data.isOk) {
            return { isOk: true, value: data.value } as Result<Delivery, APIError<DeliveryErrors>>;
        } else {
            return { isOk: false, error: data.error.response?.data } as Result<Delivery, APIError<DeliveryErrors>>;
        }
    });
};

// Create a new ground
export const createDelivery = async (request: CreateDeliveryRequest): Promise<Result<Delivery, APIError<DeliveryErrors>>> => {
    const response =  Post<CreateDeliveryRequest, APIError<DeliveryErrors>>(`${baseUrl}/api/admin/v1/deliveries/create`, request);
    return response.then((data) => {
        if (data.isOk) {
            return { isOk: true, value: data.value } as Result<Delivery, APIError<DeliveryErrors>>;
        } else {
            return { isOk: false, error: data.error.response?.data } as Result<Delivery, APIError<DeliveryErrors>>;
        }
    });
}


// Update an existing ground
export const updateDelivery = async (request: ModifyDeliveryRequest): Promise<Result<Delivery, APIError<DeliveryErrors>>> => {
    const response = Put<ModifyDeliveryRequest, APIError<DeliveryErrors>>(`${baseUrl}/api/admin/v1/deliveries/update`, request);
    return response.then((data) => {
        if (data.isOk) {
            return { isOk: true, value: data.value } as Result<Delivery, APIError<DeliveryErrors>>;
        } else {
            return { isOk: false, error: data.error.response?.data } as Result<Delivery, APIError<DeliveryErrors>>;
        }
    });
}

export const deleteDelivery= async (groundId: number): Promise<Result<any, APIError<DeliveryErrors>>> => {
    const response = Delete<any, APIError<DeliveryErrors>>(`${baseUrl}/api/admin/v1/deliveries/${groundId}`);

    return response.then((data) => {
        if (data.isOk) {
            return { isOk: true, value: data.value } as Result<any, APIError<DeliveryErrors>>;
        } else {
            return { isOk: false, error: data.error.response?.data } as Result<any, APIError<DeliveryErrors>>;
        }
    });
}

