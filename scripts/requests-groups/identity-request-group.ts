import RequestsBase from "~/scripts/requests-groups/requests-base";
import {IdentityRequest} from "~/scripts/request-models/identity-request";
import {IdentityResponse} from "~/scripts/response-models/identity-response";

export class IdentityRequestGroup extends RequestsBase {
    constructor() {
        super("identity");
    }

    async login(payload: IdentityRequest, onSuccess: (x: IdentityResponse) => any) {
        return await this.httpClient.post<IdentityRequest, IdentityResponse>("/login", payload, onSuccess);
    }

    async register(payload: IdentityRequest, onSuccess: (x: any) => any) {
        return await this.httpClient.post("/register", payload, onSuccess);
    }
}