import Authentication from "~/scripts/http/authentication";
import HttpClient from "~/scripts/http/http-client";

export default abstract class RequestsBase {
    protected readonly authentication?: Authentication;
    protected readonly httpClient: HttpClient;
    
    protected constructor(controllerName: string, authentication?: Authentication) {
        this.authentication = authentication;
        this.httpClient = new HttpClient(controllerName, this.authentication);
    }
}