# Поиск релизов

Сначала [установите пакет и создайте клиент](/guide/getting-started).
Полный запускаемый пример также приведён на странице первого запроса.

## Вызов SDK

Фрагмент для асинхронной функции с созданным `client`:

```js
const result = await client.endpoints.search.releases(
  { query: "Наруто" },
  0,
  { apiVersion: 2, timeoutMs: 15_000 },
);

if (!("releases" in result)) {
  throw new Error("Ожидался формат поиска API v2");
}

console.log("Получено на странице:", result.releases.length);

for (const release of result.releases) {
  console.log(release.id, release.title_ru);
}
```

## Различия версий

| Версия | Где находятся релизы |
| --- | --- |
| API v1 | `content` |
| API v2 | `releases` |

Не используйте `total_count` для ответа v2: количество полученных элементов
не равно общему количеству совпадений. Нумерация страниц начинается с `0`.
