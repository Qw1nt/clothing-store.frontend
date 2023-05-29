import {HttpStatusCode} from "axios";

export default abstract class HttpRequestErrorHandlerBase {
    public abstract statusCode: HttpStatusCode;
    public abstract action(): Promise<void>;
}