import RequestsBase from "~/scripts/requests-groups/requests-base";
import Authentication from "~/scripts/http/authentication";
import User from "~/scripts/data/user";

export class UserRequestGroup extends RequestsBase {
    constructor(authentication: Authentication) {
        super("user", authentication);
    }
    
    async getUserInfo(onSuccess: (x: User) => any){
        return await this.httpClient.get("", onSuccess);
    }
}