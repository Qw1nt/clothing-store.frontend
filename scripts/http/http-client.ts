import Authentication from "~/scripts/http/authentication";
import {HttpRequestMethods} from "~/scripts/http/http-request-methods";
import axios from "axios";
import {domain} from "~/scripts/http/http-configuration"
import {HttpResponse} from "~/scripts/http/response";

export default class HttpClient {
    private readonly _endpointGroupName: string
    private readonly _authentication?: Authentication;

    constructor(endpointGroupName: string, authentication?: Authentication) {
        this._endpointGroupName = endpointGroupName;
        this._authentication = authentication;
    }

    async get<TResponse>(endpoint: string, onSuccess?: (responseData: TResponse) => any): Promise<HttpResponse<TResponse>> {
        const request = () => axios.get<TResponse>(endpoint, this.#createRequestOptions(HttpRequestMethods.GET));
        return await this.#sendRequest(request, onSuccess);
    }

    async post<TRequestData, TResponse>(endpoint: string, payload: TRequestData, onSuccess?: (responseData: TResponse) => any): Promise<HttpResponse<TResponse>> {
        const request = () => axios.post<TResponse>(endpoint, payload, this.#createRequestOptions(HttpRequestMethods.POST));
        return await this.#sendRequest(request, onSuccess);
    }

    async put<TRequest, TResponse>(endpoint: string, payload: TResponse, onSuccess?: (responseData: TResponse) => any): Promise<HttpResponse<TResponse>> {
        const request = () => axios.put<TResponse>(endpoint, payload, this.#createRequestOptions(HttpRequestMethods.PUT));
        return await this.#sendRequest(request, onSuccess);
    }

    async delete(endpoint: string, onSuccess?: (responseData: any | null) => any): Promise<HttpResponse<any>> {
        const request = () => axios.delete(endpoint, this.#createRequestOptions(HttpRequestMethods.DELETE));
        return await this.#sendRequest(request, onSuccess);
    }

    async #sendRequest<TResponse>(request: Function, onSuccess?: (responseData: TResponse) => any): Promise<HttpResponse<TResponse>> {
        try {
            const response = await request();

            if (onSuccess != null) {
                onSuccess(response.data);
            }

            return {
                data: response.data,
                errors: null
            }
        } catch (error) {
            return {
                data: null,
                errors: (error as any).response.data
            }
        }
    }

    #createRequestOptions(method: HttpRequestMethods) {
        return {
            method: method,
            headers: {
                Authorization: `Bearer ${this._authentication?.token}`
            },
            baseURL: `${domain}/${this._endpointGroupName}`
        }
    }
}