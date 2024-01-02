import { baseUrl } from "../../common/apis/common";
import {APIError, Delete, Get, Post} from "../../common/axiosFetch";
import { Result } from "../../common/poliTypes";
import {GroundType} from "../../ground/apis/ground";

export enum Position {
    LIGHT = 'LIGHT',
    PENUMBRA = 'PENUMBRA',
    DARK = 'DARK',
}
export type Plant = {
    id: number;
    name: string;
    plantSpeciesId:string;
    description: string;
    price: number;
    stockQuantity: number;
    image: string | null;
    groundType: GroundType;
    position: Position; // Assuming position is optional
    beginners: boolean;
    collectible: boolean;
};

export type PlantShort = {
    id: number;
    name: string;

};

export type CreatePlantRequest = {
    name: string;
    plantSpeciesId:number;
    description: string;
    price: number;
    groundType: GroundType;
    position: Position; // Assuming position is optional
    beginners?: boolean;
    collectible?: boolean;
    stockQuantity: number;
    image: string | null;

}

export type ModifyPlantRequest = {
    name: string;
    description: string;
    price: number;
    groundType: GroundType;
    position: Position; // Assuming position is optional
    beginners: boolean;
    collectible: boolean;
    stockQuantity: number;
    image: string | null;
}

export type PlantErrors = string;

export const loadPlantBySpeciesId = async (id: string): Promise<Result<Plant[], APIError<PlantErrors>>> => {
    const response = Get<Plant[], APIError<PlantErrors>>(`${baseUrl}/api/v1/plant/species/${id}`);

    return response.then((data) => {
        if (data.isOk) {
            return { isOk: true, value: data.value } as Result<Plant[], APIError<PlantErrors>>;
        } else {
            return { isOk: false, error: data.error.response?.data } as Result<Plant[], APIError<PlantErrors>>;
        }
    });
}

export const loadPlants= async ():Promise<Result<Plant[], APIError<PlantErrors>>>  => {
    const response = Get<Plant[], APIError<PlantErrors>>(`${baseUrl}/api/v1/plant/all`);
    return response.then((data) => {
        if (data.isOk) {
            return { isOk: true, value: data.value } as Result<Plant[], APIError<PlantErrors>>;
        } else {
            return { isOk: false, error: data.error.response?.data } as Result<Plant[], APIError<PlantErrors>>;
        }
    });
}

export const loadPlantsPopular= async ():Promise<Result<PlantShort[], APIError<PlantErrors>>>  => {
    const response = Get<PlantShort[], APIError<PlantErrors>>(`${baseUrl}/api/v1/plant/popular`);
    return response.then((data) => {
        if (data.isOk) {
            return { isOk: true, value: data.value } as Result<PlantShort[], APIError<PlantErrors>>;
        } else {
            return { isOk: false, error: data.error.response?.data } as Result<PlantShort[], APIError<PlantErrors>>;
        }
    });
}
export const loadPlantById = async (id: string): Promise<Result<Plant, APIError<PlantErrors>>> => {
    const response = Get<Plant, APIError<PlantErrors>>(`${baseUrl}/api/v1/plant/${id}`);

    return response.then((data) => {
        if (data.isOk) {
            return { isOk: true, value: data.value } as Result<Plant, APIError<PlantErrors>>;
        } else {
            return { isOk: false, error: data.error.response?.data } as Result<Plant, APIError<PlantErrors>>;
        }
    });
}

export const deletePlant = async (id: number): Promise<Result<Plant, APIError<PlantErrors>>> => {
    const response = Delete<Plant, APIError<PlantErrors>>(`${baseUrl}/api/v1/plant/${id}`);

    return response.then((data) => {
        if (data.isOk) {
            return { isOk: true, value: data.value } as Result<Plant, APIError<PlantErrors>>;
        } else {
            return { isOk: false, error: data.error.response?.data } as Result<Plant, APIError<PlantErrors>>;
        }
    });
}

export const createPlant = async (plant: CreatePlantRequest): Promise<Result<Plant, APIError<PlantErrors>>> => {
    const response = Post<Plant, APIError<PlantErrors>>(`${baseUrl}/api/admin/v1/plant/create`, plant);

    return response.then((data) => {
        if (data.isOk) {
            return { isOk: true, value: data.value } as Result<Plant, APIError<PlantErrors>>;
        } else {
            return { isOk: false, error: data.error.response?.data } as Result<Plant, APIError<PlantErrors>>;
        }
    });
}


export const loadPlantsByPosition = async (position: string): Promise<Result<Plant[], APIError<PlantErrors>>> => {
    const response =  Get<Plant[], APIError<PlantErrors>>(`${baseUrl}/api/v1/plant/position/${position}`);
    return response.then((data) => {
        if (data.isOk) {
            return { isOk: true, value: data.value } as Result<Plant[], APIError<PlantErrors>>;
        } else {
            return { isOk: false, error: data.error.response?.data } as Result<Plant[], APIError<PlantErrors>>;
        }
    });
}


export const loadPlantsForBeginners = async (isForBeginners: boolean): Promise<Result<Plant[], APIError<PlantErrors>>> => {
    const response =  Get<Plant[], APIError<PlantErrors>>(`${baseUrl}/api/v1/plant/beginners/${isForBeginners}`);
    return response.then((data) => {
        if (data.isOk) {
            return { isOk: true, value: data.value } as Result<Plant[], APIError<PlantErrors>>;
        } else {
            return { isOk: false, error: data.error.response?.data } as Result<Plant[], APIError<PlantErrors>>;
        }
    });
}



export const loadCollectiblePlants = async (isCollectible: boolean): Promise<Result<Plant[], APIError<PlantErrors>>> => {
    const response = Get<Plant[], APIError<PlantErrors>>(`${baseUrl}/api/v1/plant/collectible/${isCollectible}`);

    return response.then((data) => {
        if (data.isOk) {
            return { isOk: true, value: data.value } as Result<Plant[], APIError<PlantErrors>>;
        } else {
            return { isOk: false, error: data.error.response?.data } as Result<Plant[], APIError<PlantErrors>>;
        }
    });
}

