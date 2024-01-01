import type {CommonResponseType} from "../types/response.d.ts";

const response = (data:CommonResponseType<any>) => {
    return {
        status: data.status,
        message: data.message,
        data: data.data,
    }
}

export default response;