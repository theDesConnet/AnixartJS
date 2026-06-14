> [!WARNING]
> Проект создан исключительно в ознакомительных целях. Автор осуждает создание авторегов, ботов для накрутки лайков, спам-ботов и любых других инструментов, направленных на абуз или злоупотребление API Anixart.

<br />

<div align="center">

# AnixartJS

TypeScript-библиотека для работы с API Anixart в Node.js

[![npm](https://img.shields.io/npm/v/anixartjs?style=flat-square)](https://www.npmjs.com/package/anixartjs)
[![license](https://img.shields.io/github/license/theDesConnet/AnixartJS?style=flat-square)](LICENSE)
[![language](https://img.shields.io/github/languages/top/theDesConnet/AnixartJS?style=flat-square)](https://github.com/theDesConnet/AnixartJS)
[![issues](https://img.shields.io/github/issues/theDesConnet/AnixartJS?style=flat-square)](https://github.com/theDesConnet/AnixartJS/issues)

</div>


## О проекте

**AnixartJS** — это имплементация API Anixart на **TypeScript** для **Node.js**.

Библиотека предоставляет удобный интерфейс для получения данных из Anixart: релизов, профилей, каналов, статей, ленты и других сущностей.

Можно использовать как готовые методы класса `Anixart`, так и прямой доступ к эндпоинтам через `endpoints`.


## Возможности

* работа с API Anixart через удобный TypeScript-интерфейс;
* поддержка авторизации через логин и пароль;
* возможность использовать уже существующий токен;
* получение релизов, профилей, каналов, статей и ленты;
* прямой доступ к эндпоинтам API;
* поддержка CommonJS и ESM / TypeScript.


## Установка

```bash
npm install anixartjs
```


## Быстрый старт

### CommonJS

```javascript
const { Anixart } = require("anixartjs");

const anixart = new Anixart();

async function main() {
  const release = await anixart.getReleaseById(101, true);

  if (!release) {
    console.log("Релиз не найден.");
    return;
  }

  console.log(`Релиз: ${release.titleRu}`);
}

main().catch(console.error);
```

### ESM / TypeScript

```typescript
import { Anixart } from "anixartjs";

const anixart = new Anixart();

const release = await anixart.getReleaseById(101, true);

if (release) {
  console.log(`Релиз: ${release.titleRu}`);
}
```

## Инициализация

Клиент можно создать без параметров:

```typescript
import { Anixart } from "anixartjs";

const anixart = new Anixart();
```

Также можно передать дополнительные параметры:

```typescript
const anixart = new Anixart({
  baseUrl: "https://api.anixart.tv",
  token: "your-token"
});
```

| Параметр  | Тип      | Описание                                                    |
| --------- | -------- | ----------------------------------------------------------- |
| `baseUrl` | `string` | Базовый URL API. По умолчанию используется URL Anixart API. |
| `token`   | `string` | Токен для выполнения авторизованных запросов.               |


## Авторизация

Для входа в аккаунт используйте метод `login`.

После успешной авторизации токен сохраняется внутри экземпляра клиента и используется для последующих запросов.

```typescript
import { Anixart, DefaultResult } from "anixartjs";

const anixart = new Anixart();

const responseCode = await anixart.login("username", "password");

if (responseCode === DefaultResult.Ok) {
  console.log("Вход выполнен успешно.");
} else {
  console.log("Не удалось выполнить вход. Код:", responseCode);
}
```

Также можно сразу создать клиент с уже полученным токеном:

```typescript
const anixart = new Anixart({
  token: "your-token"
});
```

## Примеры использования

<details>
<summary>Получить канал по ID</summary>

```typescript
const channel = await anixart.getChannelById(123);

if (channel) {
  console.log(`Название канала: ${channel.title}`);
} else {
  console.log("Канал не найден.");
}
```

</details>

<details>
<summary>Получить профиль пользователя по ID</summary>

```typescript
const profile = await anixart.getProfileById(456);

if (profile) {
  console.log(`Имя пользователя: ${profile.login}`);
  console.log(`ID: ${profile.id}`);
} else {
  console.log("Профиль не найден.");
}
```

</details>

<details>
<summary>Получить последние статьи ленты</summary>

```typescript
const articles = await anixart.getLatestFeed(1);

articles.forEach((article) => {
  console.log(`ID статьи: ${article.id}`);
});
```

</details>

<details>
<summary>Получить случайный релиз</summary>

```typescript
const release = await anixart.getRandomRelease(true);

if (release) {
  console.log(`Случайный релиз: ${release.titleRu}`);
} else {
  console.log("Релиз не найден.");
}
```

</details>

<details>
<summary>Получить статью по ID</summary>

```typescript
const article = await anixart.getArticleById(789);

if (article) {
  console.log(`ID статьи: ${article.id}`);
} else {
  console.log("Статья не найдена.");
}
```

</details>

<details>
<summary>Получить релиз по ID</summary>

```typescript
const release = await anixart.getReleaseById(101, true);

if (release) {
  console.log(`Заголовок релиза: ${release.titleRu}`);
} else {
  console.log("Релиз не найден.");
}
```

</details>

<details>
<summary>Прямое использование эндпоинтов</summary>

```typescript
const rawResponse = await anixart.endpoints.release.info(789, true);

console.log(rawResponse);
```

</details>


## Полный пример

```javascript
const { Anixart } = require("anixartjs");

const anixart = new Anixart();

async function main() {
  const article = await anixart.getArticleById(123);

  if (article) {
    console.log("Статья найдена:");
    console.log(`ID: ${article.id}`);
  } else {
    console.log("Статья не найдена.");
  }

  const profile = await anixart.getProfileById(456);

  if (profile) {
    console.log("Профиль пользователя:");
    console.log(`Имя пользователя: ${profile.login}`);
    console.log(`ID: ${profile.id}`);
  } else {
    console.log("Профиль не найден.");
  }

  const releaseInfo = await anixart.endpoints.release.info(789, true);

  console.log("Информация о релизе:");
  console.log(releaseInfo);
}

main().catch(console.error);
```

## TODO

* [ ] Добавить все эндпоинты API
* [x] Добавить классы для коллекций
* [ ] Расширить документацию
* [ ] Добавить полноценную поддержку использования библиотеки в браузере
* [ ] Добавить больше примеров использования


## Проекты, использующие AnixartJS

| Проект                                             | Описание                                                                      |
| -------------------------------------------------- | ----------------------------------------------------------------------------- |
| [AniDesk](https://github.com/theDesConnet/AniDesk) | Неофициальный десктоп-клиент Anixart.                                         |
| [AnixApp](https://github.com/Maks1mio/anixapp)     | Неофициальное приложение Anixart для ПК с функционалом совместного просмотра. |


## Вклад в проект

Вклад в развитие проекта приветствуется.

Можно помочь проекту несколькими способами:

* сообщить об ошибке через issue;
* предложить улучшение;
* добавить новый эндпоинт;
* улучшить документацию;
* отправить pull request.


## Лицензия

Проект распространяется под лицензией **GPL-2.0**.

Подробности можно найти в файле [LICENSE](LICENSE).

---

<div align="center">

Если у вас есть вопросы, идеи или вы нашли проблему, откройте issue в репозитории.

</div>
