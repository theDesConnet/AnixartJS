/**
 * ╔══════════════════════════════════════════════════╗
 * ║                    AnixartJS                     ║
 * ║    https://github.com/theDesConnet/AnixartJS     ║
 * ║          Licensed under GPL-2.0 License          ║
 * ║                   by DesConnet                   ║
 * ╚══════════════════════════════════════════════════╝
 */

/** Ошибка по коду Anixart API или отсутствие обязательного токена. */
export class AnixartError extends Error {
    constructor(
        message: string,
        /** Путь метода, на котором возникла ошибка. */
        public readonly path: string,
        /** Код API; при отсутствии обязательного токена клиент выставляет 401. */
        public readonly code: number,
        /** Имя кода из enum или Unknown для неизвестного значения. */
        public readonly codeName: string,
        /** Исходный ответ API, если запрос был отправлен. */
        public readonly data?: unknown
    ) {
        super(message);
        this.name = "AnixartError"
    }
}
