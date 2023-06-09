import {UserRequestGroup} from "~/scripts/requests-groups/user-request-group";
import {getAuthentication} from "~/scripts/authentication-storage";
import {UserRole} from "~/scripts/data/user-role";

export async function checkPermission(targetRole: UserRole, onSuccess: () => any, onFailure?: () => any) {
    const userRequests = new UserRequestGroup(getAuthentication());
    await userRequests.getUserInfo(async x => {
        if (x.role != targetRole) {
            if (onFailure == null) {
                return navigateTo('/login');
            } else {
                onFailure();
            }
        } else {
            await onSuccess();
        }
    })
}