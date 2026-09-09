export class AnixartError extends Error {
    constructor(
        message: string,
        public readonly path: string,
        public readonly code: number,
        public readonly codeName: string,
        public readonly data?: unknown
    ) {
        super(message);
        this.name = "AnixartError"
    }
}