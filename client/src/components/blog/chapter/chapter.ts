import { baseUrl } from "../../common/apis/common";
import {APIError, Delete, Get} from "../../common/axiosFetch";
import { Result } from "../../common/poliTypes";
import {SpeciesErrors} from "../../plant/species/apis/species";


export type Chapter = {
    id: number;
    name: string;
    type: string;
    moistureRetention: string;
    stockQuantity: number;
    image: string | null;
};


export type ChapterErrors = string;


export const loadChapters = async (): Promise<Result<Chapter[], APIError<ChapterErrors>>> => {
    const response = Get<Chapter[], APIError<ChapterErrors>>(`${baseUrl}/api/v1/chapters`);


    return response.then((data) => {
        if (data.isOk) {
            return { isOk: true, value: data.value } as Result<Chapter[], APIError<ChapterErrors>>;
        } else {
            return { isOk: false, error: data.error.response?.data } as Result<Chapter[], APIError<ChapterErrors>>;
        }
    });
}

export const deleteChapter= async (id: number): Promise<Result<any, APIError<ChapterErrors>>> => {
    const response = Delete<any, APIError<ChapterErrors>>(`${baseUrl}/api/admin/v1/chapters/delete/${id}`);

    return response.then((data) => {
        if (data.isOk) {
            return { isOk: true, value: data.value } as Result<any, APIError<ChapterErrors>>;
        } else {
            return { isOk: false, error: data.error.response?.data } as Result<any, APIError<ChapterErrors>>;
        }
    });
}




