# Обработка ошибок

Разделяйте ошибки API, HTTP и отмену запроса. Успешный HTTP-статус ещё не означает
успех операции Anixart.

## Пример

Сохраните как `searchWithErrors.js`. Пример использует CommonJS
(`"type": "commonjs"` в `package.json`).

```js
const { Anixart, AnixartError, HttpError } = require("anixartjs");

async function main() {
  const client = new Anixart({});
  await client.endpoints.search.releases(
    { query: "Наруто" },
    0,
    { apiVersion: 2, timeoutMs: 15_000 },
  );
  console.log("Запрос выполнен");
}

main().catch((error) => {
  process.exitCode = 1;

  if (error instanceof AnixartError) {
    console.error("Ошибка Anixart:", error.code, error.codeName);
    return;
  }

  if (error instanceof HttpError) {
    console.error("Ошибка HTTP или формата ответа:", error.status);
    return;
  }

  if (error instanceof Error && error.name === "AbortError") {
    console.error("Запрос отменён");
    return;
  }

  if (error instanceof Error && error.name === "TimeoutError") {
    console.error("Истекло время ожидания");
    return;
  }

  console.error("Сетевая или другая непредвиденная ошибка");
});
```

## Данные исключений

| Ошибка | Поля | Значение |
| --- | --- | --- |
| `AnixartError` | `code`, `codeName`, `path`, `data` | Код и название ошибки API, путь метода и исходный ответ |
| `HttpError` | `status`, `response` | HTTP-статус и доступные данные ответа |

`HttpError` возможен и при HTTP 200, если тело пустое или имеет неожиданный формат.
Не считайте такой ответ успешным только по `status`.

## Когда отключать исключения API

Передавайте `throwOnAnixartError: false`, только если готовы самостоятельно
разобрать код конкретного ответа. Настройка не отключает ошибки сети и HTTP.

Не все методы возвращают объект с `code`: возможны массивы и модели напрямую.
Сверяйтесь с возвращаемым типом метода.

::: warning Безопасность логов
Не выводите исключение целиком без фильтрации: тело ответа или URL могут содержать
секреты. Маскируйте токены, пароли и персональные данные.
:::