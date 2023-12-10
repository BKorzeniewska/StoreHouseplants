import { baseUrl } from "../../common/apis/common";
import { APIError, Get } from "../../common/axiosFetch";
import { Result } from "../../common/poliTypes";


export type Ground = {
    id: number;
    name: string;
    image: string | null; // Ustawienie typu na string | null, aby obsłużyć przypadki, gdy obrazek jest nullem
};


export type GroundErrors = string;


export const loadGrounds = async (): Promise<Result<Ground[], APIError<GroundErrors>>> => {
    const response = Get<Ground[], APIError<GroundErrors>>(`${baseUrl}/api/v1/grounds/all`);


    return response.then((data) => {
        if (data.isOk) {
            return { isOk: true, value: data.value } as Result<Ground[], APIError<GroundErrors>>;
        } else {
            return { isOk: false, error: data.error.response?.data } as Result<Ground[], APIError<GroundErrors>>;
        }
    });
}





