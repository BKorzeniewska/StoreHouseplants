import {APIError, Post} from "../axiosFetch";
import { Result } from "../poliTypes";
import { baseUrl } from "./common";
import {Article, ArticleErrors, CreateArticleRequest} from "../../blog/article/apis/article";


export type Chapter = {
    id: number;
    name: string;
    image: string;
}

export type CreateChapterRequest = {
    name: string;
    image: string;
}
export type ChapterErrors = string;
export const createChapter = async (chapter: CreateChapterRequest): Promise<Result<Chapter, APIError<ChapterErrors>>> => {
    const response = Post<Chapter, APIError<ChapterErrors>>(`${baseUrl}/api/admin/v1/chapters/create`, chapter);

    return response.then((data) => {
        if (data.isOk) {
            return { isOk: true, value: data.value } as Result<Chapter, APIError<ChapterErrors>>;
        } else {
            return { isOk: false, error: data.error.response?.data } as Result<Chapter, APIError<ChapterErrors>>;
        }
    });
}
