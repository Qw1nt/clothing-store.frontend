import HttpRequestErrorHandlerBase from "~/scripts/http/http-request-error-handler-base";
import {HttpStatusCode} from "axios";
import {removeAccessToken} from "~/scripts/authentication-storage"

export class UnauthorizedHandler extends HttpRequestErrorHandlerBase{
    statusCode: HttpStatusCode = HttpStatusCode.Unauthorized;

    async action() {
        removeAccessToken();
        await useRouter().push('/login');
    }
}