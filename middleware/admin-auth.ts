import {UserRequestGroup} from "~/scripts/requests-groups/user-request-group";
import {getAuthentication} from "~/scripts/authentication-storage";
import {UserRole} from "~/scripts/data/user-role";

export default defineNuxtRouteMiddleware(async (to, from) => {
    const userRequests = new UserRequestGroup(getAuthentication());
    const response = await userRequests.getUserInfo(x => {
        if (x.role != UserRole.Admin) {
            return navigateTo('/login');
        }
    })
})