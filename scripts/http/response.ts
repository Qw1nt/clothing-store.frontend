import {AxiosError} from "axios";

export interface HttpResponse<T> {
    data: T | null;
    errors: string | null;
}