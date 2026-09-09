# Клиент Anixart

## Создание

```js
const { Anixart } = require("anixartjs");

const client = new Anixart({});
```

| Опция | Тип | Назначение |
| --- | --- | --- |
| `baseUrl` | `string` | Переопределяет адрес API |
| `token` | `string` | Токен аккаунта |
| `userAgent` | `string` | Переопределяет User-Agent |
| `throwOnAnixartError` | `boolean` | Обработка ошибок Anixart; по умолчанию `true` |

::: warning User-Agent
Не подставляйте произвольный User-Agent: сервер может отклонять запросы.
Без необходимости используйте значение, заданное библиотекой.
:::

## Методы

| Метод | Результат | Назначение |
| --- | --- | --- |
| `setToken(token: string \| undefined)` | `void` | Установить или убрать токен |
| `getBaseUrl()` | `string` | Получить текущий URL API |
| `setBaseUrl(baseUrl: string)` | `void` | Изменить URL API |

Методы групп вызываются через `client.endpoints`, например
`client.endpoints.search.releases(...)`.
