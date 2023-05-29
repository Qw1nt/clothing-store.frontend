import Authentication from "~/scripts/http/authentication";
import {HttpRequestMethods} from "~/scripts/http/http-request-methods";
import axios, {AxiosError} from "axios";
import {domain} from "~/scripts/http/http-configuration"
import {HttpResponse} from "~/scripts/http/response";
import HttpRequestErrorHandlerBase from "~/scripts/http/http-request-error-handler-base";

export default class HttpClient {
    private readonly _endpointGroupName: string
    private readonly _authentication?: Authentication;
    private readonly _defaultErrorHandlers = new Map<number, HttpRequestErrorHandlerBase>();

    constructor(endpointGroupName: string, authentication?: Authentication, errorHandlers?: HttpRequestErrorHandlerBase[]) {
        this._endpointGroupName = endpointGroupName;
        this._authentication = authentication;
        errorHandlers?.forEach(handler => {
            this._defaultErrorHandlers.set(handler.statusCode, handler);
        })
    }

    async get<TResponse>(endpoint: string, onSuccess?: (responseData: TResponse) => any, errorHandlers?: HttpRequestErrorHandlerBase[]): Promise<HttpResponse<TResponse>> {
        const request = () => axios.get<TResponse>(endpoint, this.#createRequestOptions(HttpRequestMethods.GET));
        return await this.#sendRequest(request, onSuccess, errorHandlers);
    }

    async post<TRequestData, TResponse>(endpoint: string, payload: TRequestData, onSuccess?: (responseData: TResponse) => any, errorHandlers?: HttpRequestErrorHandlerBase[]): Promise<HttpResponse<TResponse>> {
        const request = () => axios.post<TResponse>(endpoint, payload, this.#createRequestOptions(HttpRequestMethods.POST));
        return await this.#sendRequest(request, onSuccess, errorHandlers);
    }

    async put<TRequest, TResponse>(endpoint: string, payload: TResponse, onSuccess?: (responseData: TResponse) => any, errorHandlers?: HttpRequestErrorHandlerBase[]): Promise<HttpResponse<TResponse>> {

        const request = () => axios.put<TResponse>(endpoint, payload, this.#createRequestOptions(HttpRequestMethods.PUT));
        console.log('PUTsd')
        return await this.#sendRequest(request, onSuccess, errorHandlers);
    }

    async delete(endpoint: string, onSuccess?: (responseData: any | null) => any, errorHandlers?: HttpRequestErrorHandlerBase[]): Promise<HttpResponse<any>> {
        const request = () => axios.delete(endpoint, this.#createRequestOptions(HttpRequestMethods.DELETE));
        return await this.#sendRequest(request, onSuccess, errorHandlers);
    }

    async #sendRequest<TResponse>(request: Function, onSuccess?: (responseData: TResponse) => any, errorHandlers?: HttpRequestErrorHandlerBase[],): Promise<HttpResponse<TResponse>> {
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
            const typedError = error as AxiosError
            await this.#handleError(typedError, errorHandlers);
            
            return  {
                data: null,
                errors: typedError.response!.data! as string
            };
        }
    }

    async #handleError(axiosError: AxiosError, errorHandlers?: HttpRequestErrorHandlerBase[]){
        const statusCode = axiosError.response?.status;
        if(statusCode == undefined){
            return;
        }
        
        const defaultHandler = this._defaultErrorHandlers.get(statusCode);
        if(defaultHandler != null){
            await defaultHandler.action();
            return;
        }
        
        if(errorHandlers == null){
            return;
        }
        
        for (const handler of errorHandlers) {
            if(handler.statusCode == statusCode){
                await handler.action();
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