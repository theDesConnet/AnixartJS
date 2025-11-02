import { Anixart } from "../client";
import {
    ILoginResponse,
    ILoginRequest,
    IRegisterRequest,
    IRegisterResponse,
    IRegisterVerifyRequest,
    IBaseApiParams,
    IRestorePasswordRequest,
    LoginResult,
    RegisterVerifyResult,
    RegisterResult,
    RestorePasswordResult,
    RestorePasswordVerifyResult
} from "../types";

/**
 * Класс с эндпоинтами авторизации
 */
export class Auth {
    public constructor(private readonly client: Anixart) { }

    /**
     * Авторизация в профиль
     * 
     * Возвращает ответ {@link ILoginResponse}.
     * 
     * Возможные ответы API в виде enum смотреть здесь {@link DefaultResult}, {@link LoginResult}
     * 
     * @param data - Данные для авторизации
     * @param options - Дополнительные параметры
     * @returns Информацию о профиле и токен
     * 
     * @example
     * const result = await client.endpoints.auth.signIn({
     *     login: 'username',   //Логин
     *     password: 'password' //Пароль
     * });
     */
    public async signIn(data: ILoginRequest, options?: IBaseApiParams): Promise<ILoginResponse> {
        return this.client.call<LoginResult, ILoginResponse>({
            path: '/auth/signIn',
            urlEncoded: data,
            ...options
        });
    }

    /**
     * Регистрация в Anixart
     * 
     * Возвращает ответ {@link IRegisterResponse}.
     * 
     * Возможные ответы API в виде enum смотреть здесь {@link DefaultResult}, {@link RegisterResult}
     * 
     * @param data - Данные для регистрации
     * @param options - Дополнительные параметры
     * @returns Хеш для подтверждения
     * 
     * @example
     * const result = await client.endpoints.auth.signUp({
     *     username: 'username',    //Логин
     *     password: 'password',    //Пароль
     *     email: 'email',          //Почта
     * });
     */
    public async signUp(data: IRegisterRequest, options?: IBaseApiParams): Promise<IRegisterResponse> {
        return this.client.call<RegisterResult, IRegisterResponse>({
            path: '/auth/signUp',
            urlEncoded: data,
            ...options
        })
    }

    /**
     * Подтверждение регистрации
     * 
     * Возвращает ответ {@link ILoginResponse}.
     * 
     * Возможные ответы API в виде enum смотреть здесь {@link DefaultResult}, {@link RegisterVerifyResult}
     * 
     * @param data - Данные для подтверждения
     * @param options - Дополнительные параметры
     * @returns Информацию о профиле и токен
     * 
     * @example
     * const result = await client.endpoints.auth.signUpVerify({
     *     username: 'username',    //Логин
     *     password: 'password',    //Пароль
     *     email: 'email',          //Почта
     *     hash: 'hash',            //Хеш
     *     code: 0000,              //Код
     * });
     */
    public async signUpVerify(data: IRegisterVerifyRequest, options?: IBaseApiParams): Promise<ILoginResponse<RegisterVerifyResult>> {
        return this.client.call<RegisterVerifyResult, ILoginResponse<RegisterVerifyResult>>({
            path: '/auth/verify',
            urlEncoded: data,
            ...options
        })
    }

    /**
     * Восстановление аккаунта по почте
     * 
     * Возвращает ответ {@link IRegisterResponse}.
     * 
     * Возможные ответы API в виде enum смотреть здесь {@link DefaultResult}, {@link RestorePasswordResult}
     * 
     * @param login - Логин пользователя
     * @param options - Дополнительные параметры
     * @returns Хеш для подтверждения
     * 
     * @example
     * const result = await client.endpoints.auth.restore("login");
     */
    public async restore(login: string, options?: IBaseApiParams): Promise<IRegisterResponse<RestorePasswordResult>> {
        return this.client.call<RestorePasswordResult, IRegisterResponse<RestorePasswordResult>>({
            path: '/auth/restore',
            urlEncoded: { data: login },
            ...options
        })
    }

    /**
     * Подтверждение восстановления
     * 
     * Возвращает ответ {@link ILoginResponse}.
     * 
     * Возможные ответы API в виде enum смотреть здесь {@link DefaultResult}, {@link RestorePasswordVerifyResult}
     * 
     * @param data - Данные для подтверждения
     * @param options - Дополнительные параметры
     * @returns Информацию о профиле и токен
     * 
     * @example
     * const result = await client.endpoints.auth.restoreVerify({
     *     username: 'username',    //Логин
     *     password: 'password',    //Пароль
     *     hash: 'hash',            //Хеш
     *     code: 0000,              //Код
     * });
     */
    public async restoreVerify(data: IRestorePasswordRequest, options?: IBaseApiParams): Promise<ILoginResponse<RestorePasswordVerifyResult>> {
        return this.client.call<RestorePasswordVerifyResult, ILoginResponse<RestorePasswordVerifyResult>>({
            path: '/auth/restore/verify',
            urlEncoded: {
                data: data.username,
                password: data.password,
                code: data.code,
                hash: data.hash
            },
            ...options
        })
    }
}