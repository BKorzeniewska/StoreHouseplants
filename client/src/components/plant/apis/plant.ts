import { baseUrl } from "../../common/apis/common";
import { APIError, Get } from "../../common/axiosFetch";
import { Result } from "../../common/poliTypes";


export type Plant = {
    id: number;
    name: string;
    description: string;
    price: number;
    stockQuantity: number;
    image: string | null;
};


export type PlantErrors = string;
//TODO
export const loadPlantBySpeciesId = async (id: string): Promise<Result<Plant[], APIError<PlantErrors>>> => {
    const response = Get<Plant[], APIError<PlantErrors>>(`${baseUrl}/api/v1/article/chapter/${id}`);

    return response.then((data) => {
        if (data.isOk) {
            return { isOk: true, value: data.value } as Result<Plant[], APIError<PlantErrors>>;
        } else {
            return { isOk: false, error: data.error.response?.data } as Result<Plant[], APIError<PlantErrors>>;
        }
    });
}





