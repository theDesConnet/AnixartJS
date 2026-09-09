# Установка и первый запрос

AnixartJS предназначен для Node.js. Не размещайте токен аккаунта в клиентском коде сайта.

## Установка

В папке своего Node.js-проекта установите пакет из npm:

```sh
npm install anixartjs
```

Если проект ещё не содержит `package.json`, сначала выполните `npm init -y`.
Создайте файл `firstRequest.js` рядом с `package.json`.

## Первый запрос

```js
const { Anixart } = require("anixartjs");

async function main() {
  const client = new Anixart({});
  const response = await client.endpoints.search.releases(
    { query: "Наруто" },
    0,
    { apiVersion: 2, timeoutMs: 15_000 },
  );

  if (!("releases" in response)) {
    throw new Error("Получен неожиданный формат ответа поиска");
  }

  console.table(response.releases.map((release) => ({
    id: release.id,
    title: release.title_ru,
  })));
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : "Не удалось выполнить запрос");
  process.exitCode = 1;
});
```

Запустите из папки своего проекта:

```sh
node firstRequest.js
```

::: tip Формат модулей
Примеры `.js` используют CommonJS: в `package.json` задайте `"type": "commonjs"`
или не указывайте `type`. Если в проекте задано `"type": "module"`, замените
`require` на ESM-импорт: `import { Anixart } from "anixartjs"`.
:::

::: info Версия библиотеки
Документация описывает последную версию SDK. Если установленная версия из npm
имеет другой интерфейс, сверьтесь с документацией соответствующего релиза.
:::

Далее: [передача токена](./authentication) и [настройка запросов](./requests).
