/**
 * ╔══════════════════════════════════════════════════╗
 * ║                    AnixartJS                     ║
 * ║    https://github.com/theDesConnet/AnixartJS     ║
 * ║          Licensed under GPL-2.0 License          ║
 * ║                   by DesConnet                   ║
 * ╚══════════════════════════════════════════════════╝
 */

/** Неуспешный HTTP-статус, пустое тело ответа или некорректный JSON. */
export class HttpError extends Error {
    constructor(
        message: string,
        /** HTTP-статус ответа сервера. */
        public readonly status: number,
        /** Тело ответа до разбора JSON. */
        public readonly response?: unknown
    ) {
        super(message);
        this.name = "HttpError"
    }
}
