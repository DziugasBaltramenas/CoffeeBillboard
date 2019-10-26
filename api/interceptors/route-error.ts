export interface ErrorModel {
    status: number;
    message?: string;
}

export class RouteError extends Error {
    public readonly status: number;
    public readonly  message: string;

    constructor(error: ErrorModel) {
        super();

        this.status = error.status;
        this.message = error.message;
    }
}
