export class HttpError extends Error {
    constructor(
        message: string,
        public readonly status: number,
        public readonly response?: unknown
    ) {
        super(message);
        this.name = "HttpError"
    }
}