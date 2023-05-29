import RequestsBase from "~/scripts/requests-groups/requests-base";
import Authentication from "~/scripts/http/authentication";
import User from "~/scripts/data/user";
import {OrderInHistory} from "~/scripts/data/order-in-history";
import {UnauthorizedHandler} from "~/scripts/http/not-authorized-error-handler";

export class UserRequestGroup extends RequestsBase {
    constructor(authentication: Authentication) {
        super("user", authentication);
    }

    async getUserInfo(onSuccess: (x: User) => any) {
        const unauthorized = new UnauthorizedHandler();
        return await this.httpClient.get("", onSuccess, [unauthorized]);
    }

    async getOrderHistory(onSuccess: (x: OrderInHistory[]) => any) {
        const unauthorized = new UnauthorizedHandler();
        return await this.httpClient.get("order/history", onSuccess, [unauthorized]);
    }
}