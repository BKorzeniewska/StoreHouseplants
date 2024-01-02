import { baseUrl} from "../../../common/apis/common";
import {APIError, Delete, Get, Post, Put} from "../../../common/axiosFetch";
import { Result} from "../../../common/poliTypes";
import {Plant, PlantErrors} from "../../apis/plant";
import {Article, ArticleErrors, CreateArticleRequest, ModifyArticleRequest} from "../../../blog/article/apis/article";


export type Species = {
    id: number;
    name: string;
    image: string | null;
};
export type CreateSpeciesRequest = {
    name: string;
    image: string | null;
};
export type ModifySpeciesRequest = {
    id: number;
    name: string;
    image: string | null;
};


export type SpeciesErrors = string;


export const loadSpecies = async (): Promise<Result<Species[], APIError<SpeciesErrors>>> => {
    const response = Get<Species[], APIError<SpeciesErrors>>(`${baseUrl}/api/v1/species/all`);


    return response.then((data) => {
        if (data.isOk) {
            return { isOk: true, value: data.value } as Result<Species[], APIError<SpeciesErrors>>;
        } else {
            return { isOk: false, error: data.error.response?.data } as Result<Species[], APIError<SpeciesErrors>>;
        }
    });
}

export const loadSpeciesById = async (id: string): Promise<Result<Species, APIError<SpeciesErrors>>> => {
    const response = Get<Species, APIError<SpeciesErrors>>(`${baseUrl}/api/v1/species/${id}`);

    return response.then((data) => {
        if (data.isOk) {
            return { isOk: true, value: data.value } as Result<Species, APIError<SpeciesErrors>>;
        } else {
            return { isOk: false, error: data.error.response?.data } as Result<Species, APIError<SpeciesErrors>>;
        }
    });
}


export const createSpecies = async (species: CreateSpeciesRequest): Promise<Result<Species, APIError<SpeciesErrors>>> => {
    const response = Post<Species, APIError<SpeciesErrors>>(`${baseUrl}/api/admin/v1/species/create`, species);

    return response.then((data) => {
        if (data.isOk) {
            return { isOk: true, value: data.value } as Result<Species, APIError<SpeciesErrors>>;
        } else {
            return { isOk: false, error: data.error.response?.data } as Result<Species, APIError<SpeciesErrors>>;
        }
    });
}

export const modifySpecies= async (species: ModifySpeciesRequest): Promise<Result<Species, APIError<SpeciesErrors>>> => {
    const response = Put<Species, APIError<SpeciesErrors>>(`${baseUrl}/api/admin/v1/species/update`, species);

    return response.then((data) => {
        if (data.isOk) {
            return { isOk: true, value: data.value } as Result<Species, APIError<SpeciesErrors>>;
        } else {
            return { isOk: false, error: data.error.response?.data } as Result<Species, APIError<SpeciesErrors>>;
        }
    });
}

export const deleteSpecies = async (speciesId: number): Promise<Result<any, APIError<SpeciesErrors>>> => {
    const response = Delete<any, APIError<SpeciesErrors>>(`${baseUrl}/api/admin/v1/species/delete/${speciesId}`);

    return response.then((data) => {
        if (data.isOk) {
            return { isOk: true, value: data.value } as Result<any, APIError<SpeciesErrors>>;
        } else {
            return { isOk: false, error: data.error.response?.data } as Result<any, APIError<SpeciesErrors>>;
        }
    });
}
