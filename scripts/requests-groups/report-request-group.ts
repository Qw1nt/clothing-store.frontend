import RequestsBase from "~/scripts/requests-groups/requests-base";
import Authentication from "~/scripts/http/authentication";
import {BuildReportRequest} from "~/scripts/request-models/build-report-request";
import {ReportRecord} from "~/scripts/data/report-record";

export class ReportRequestGroup extends RequestsBase {
    constructor(authentication: Authentication) {
        super("report", authentication);
    }

    async build(request: BuildReportRequest, onSuccess: (x: ReportRecord[]) => any) {
        return await this.httpClient.post("", request, onSuccess);
    }
}