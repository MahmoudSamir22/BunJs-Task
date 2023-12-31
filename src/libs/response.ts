import {Elysia} from "elysia";

const response = (data:any) => {
    return {
        status: data.status,
        message: data.message,
        data: data.data,
    }
}

export default response;