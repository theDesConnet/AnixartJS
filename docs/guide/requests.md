# Параметры запросов

Методы эндпоинтов принимают `options` последним аргументом.

| Параметр | Тип | Назначение |
| --- | --- | --- |
| `timeoutMs` | `number` | Ограничение времени выполнения запроса в миллисекундах |
| `signal` | `AbortSignal` | Внешняя отмена запроса |
| `apiVersion` | `number` | Версия API; применимость и формат ответа зависят от метода |
| `throwOnAnixartError` | `boolean` | Выбрасывать исключение при ошибке Anixart в ответе |

## Таймаут и отмена

Фрагмент выполняется внутри вашей асинхронной функции с созданным `client`:

```js
const controller = new AbortController();

const pendingSearch = client.endpoints.search.releases(
  { query: "Наруто" },
  0,
  {
    apiVersion: 2,
    timeoutMs: 15_000,
    signal: controller.signal,
  },
);

controller.abort();

try {
  await pendingSearch;
} catch (error) {
  console.error(error instanceof Error ? error.message : "Запрос завершился ошибкой");
}
```

Здесь отмена вызывается сразу для демонстрации. В приложении вызывайте
`controller.abort()`, например, при завершении процесса или отмене операции пользователем.

## Обработка ошибок

`throwOnAnixartError: false` отключает исключение по коду Anixart, но не превращает
сетевые ошибки, отмену и некорректные HTTP-ответы в успешный результат.

Не все ответы содержат `code`: отдельные методы возвращают модель напрямую или массив.
Не проверяйте `response.code` без учёта типа ответа.