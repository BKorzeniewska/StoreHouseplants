import {baseUrl} from "../../common/apis/common";
import {APIError, Get} from "../../common/axiosFetch";
import {Result} from "../../common/poliTypes";


export type Chapter = {
    id: number;
    name: string;
    image: string;
}
export type ChapterErrors = string;
export const loadChapters = async (id: string): Promise<Result<Chapter, APIError<ChapterErrors>>> => {
    const response = Get<Chapter, APIError<ChapterErrors>>(`${baseUrl}/api/v1/chapters`);

    return response.then((data) => {
        if (data.isOk) {
            return { isOk: true, value: data.value } as Result<Chapter, APIError<ChapterErrors>>;
        } else {
            return { isOk: false, error: data.error.response?.data } as Result<Chapter, APIError<ChapterErrors>>;
        }
    });
}