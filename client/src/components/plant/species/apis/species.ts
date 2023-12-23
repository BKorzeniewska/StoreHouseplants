import { baseUrl} from "../../../common/apis/common";
import { APIError, Get} from "../../../common/axiosFetch";
import { Result} from "../../../common/poliTypes";
import {Plant, PlantErrors} from "../../apis/plant";


export type Species = {
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






