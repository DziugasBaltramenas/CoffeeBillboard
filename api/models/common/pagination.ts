import { ParsedUrlQueryInput } from "querystring";

export interface PaginationRequestModel extends ParsedUrlQueryInput {
    skip: number;
    take: number;
}

export interface PaginationResponseModel<T> {
    items: T[];
    count: number;
}
