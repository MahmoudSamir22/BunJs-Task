export type CommonResponseType<T> = {
    status: boolean;
    message: string;
    data: T;
}