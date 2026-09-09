> [!WARNING]
> Проект создан исключительно в ознакомительных целях. Автор осуждает и не поддерживает создание авторегов, ботов для накрутки лайков, спам-ботов и любых других инструментов, направленных на абуз или злоупотребление API Anixart.

> [!IMPORTANT]
> Новая версия AnixartJS содержит значительные изменения и не полностью совместима с версиями **v0.x**.
>
> В версии v1.x была переработана структура проекта, изменён публичный API, способы вызова эндпоинтов, авторизации, конфигурации клиента и часть моделей данных.
>
> Если ваш проект использует старую версию AnixartJS, обновление может потребовать изменений в существующем коде. Перед переходом рекомендуется изучить изменения в новой версии, проверить используемые методы и типы, а также заранее заложить время на миграцию и тестирование.
>
> Не рекомендуется обновлять AnixartJS в существующем проекте без предварительной проверки совместимости.

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

**AnixartJS** — неофициальная TypeScript-библиотека для работы с API Anixart из Node.js.

Основной интерфейс библиотеки построен вокруг класса `Anixart` и набора типизированных групп эндпоинтов в `client.endpoints`.

Библиотека предоставляет доступ к релизам, профилям, каналам, статьям, коллекциям, ленте, уведомлениям, поиску, импорту и экспорту данных, а также другим возможностям API.

## Возможности

* типизированный интерфейс для API Anixart;
* модели ответов и enum'ы для кодов и параметров API;
* авторизация по логину и паролю;
* использование уже существующего токена;
* работа с релизами, профилями, каналами и статьями;
* работа с коллекциями, комментариями и закладками;
* поиск, лента, уведомления, импорт и экспорт;
* настройка таймаута и отмена запросов через `AbortSignal`;
* выбор версии API для отдельных запросов;
* управление обработкой ошибок Anixart;
* `ArticleBuilder` для формирования содержимого статей;
* парсеры ссылок на поддерживаемые видеосервисы;
* CommonJS-сборка и декларации типов TypeScript.

## Установка

```bash
npm install anixartjs
```

## Быстрый старт

### CommonJS

```javascript
const { Anixart } = require("anixartjs");

const client = new Anixart({});

async function main() {
  const { release } = await client.endpoints.release.get(
    101,
    true,
    { timeoutMs: 15_000 }
  );

  console.log(`Релиз: ${release.title_ru}`);
}

main().catch(console.error);
```

### TypeScript

```typescript
import { Anixart } from "anixartjs";

const client = new Anixart({});

const { profile } = await client.endpoints.profile.get(
  456,
  { timeoutMs: 15_000 }
);

console.log(`Пользователь: ${profile.login}`);
```

## Инициализация

Клиент создаётся с объектом параметров:

```typescript
import { Anixart } from "anixartjs";

const client = new Anixart({});
```

Можно сразу передать дополнительные настройки:

```typescript
const client = new Anixart({
  baseUrl: "https://api.anixsekai.com",
  token: "your-token",
  userAgent: "your-user-agent",
  throwOnAnixartError: true
});
```

| Параметр              | Тип       | Описание                                                                       |
| --------------------- | --------- | ------------------------------------------------------------------------------ |
| `baseUrl`             | `string`  | Базовый URL API. По умолчанию используется `https://api.anixsekai.com`.        |
| `token`               | `string`  | Токен для авторизованных запросов.                                             |
| `userAgent`           | `string`  | Пользовательский `User-Agent` для HTTP-запросов.                               |
| `throwOnAnixartError` | `boolean` | Выбрасывать `AnixartError` при ошибках, возвращаемых API. По умолчанию `true`. |

### Управление клиентом

Токен можно изменить после создания экземпляра:

```typescript
client.setToken("your-token");
```

Удалить токен:

```typescript
client.setToken(undefined);
```

Получить или изменить базовый URL:

```typescript
console.log(client.getBaseUrl());

client.setBaseUrl("https://example.com");
```

Также библиотека умеет получать актуальный список адресов API:

```typescript
const endpoints = await Anixart.getEndpointUrls();

console.log(endpoints);
```

## Авторизация

Для входа по логину и паролю используется `client.endpoints.auth.signIn()`.

После успешного входа токен можно получить из `profileToken` и установить в клиент через `setToken()`:

```typescript
import { Anixart } from "anixartjs";

const client = new Anixart({});

const result = await client.endpoints.auth.signIn(
  {
    login: "username",
    password: "password"
  },
  {
    timeoutMs: 15_000
  }
);

const token = result.profileToken?.token;

if (!token) {
  throw new Error("Сервер не вернул токен авторизации.");
}

client.setToken(token);

console.log(`Вход выполнен: ${result.profile.login}`);
```

Если токен уже известен, его можно передать сразу:

```typescript
const client = new Anixart({
  token: "your-token"
});
```

> [!IMPORTANT]
> Не сохраняйте логины, пароли и токены непосредственно в исходном коде. Для приложений и примеров лучше использовать переменные окружения или другое безопасное хранилище конфигурации.

## Работа с эндпоинтами

Основная часть API доступна через `client.endpoints`.

Например:

```typescript
client.endpoints.auth
client.endpoints.article
client.endpoints.channel
client.endpoints.collection
client.endpoints.feed
client.endpoints.notification
client.endpoints.profile
client.endpoints.release
client.endpoints.search
```

Кроме них доступны специализированные группы для комментариев, друзей, закладок, истории, эпизодов, расписания, настроек профиля, импорта, экспорта и других частей API.

## Примеры использования

<details>
<summary>Получить релиз по ID</summary>

```typescript
const { release } = await client.endpoints.release.get(
  101,
  true,
  { timeoutMs: 15_000 }
);

console.log(`ID: ${release.id}`);
console.log(`Название: ${release.title_ru}`);
console.log(`Рейтинг: ${release.rating}`);
```

</details>

<details>
<summary>Получить случайный релиз</summary>

```typescript
const { release } = await client.endpoints.release.random(
  true,
  { timeoutMs: 15_000 }
);

console.log(`Случайный релиз: ${release.title_ru}`);
```

</details>

<details>
<summary>Получить профиль пользователя</summary>

```typescript
const { profile } = await client.endpoints.profile.get(
  456,
  { timeoutMs: 15_000 }
);

console.log(`ID: ${profile.id}`);
console.log(`Пользователь: ${profile.login}`);
```

</details>

<details>
<summary>Использовать токен</summary>

```typescript
const client = new Anixart({
  token: process.env.ANIXART_TOKEN
});
```

Токен также можно установить позднее:

```typescript
client.setToken(process.env.ANIXART_TOKEN);
```

</details>

<details>
<summary>Установить таймаут запроса</summary>

```typescript
const { profile } = await client.endpoints.profile.get(
  456,
  {
    timeoutMs: 15_000
  }
);
```

</details>

<details>
<summary>Отменить запрос</summary>

```typescript
const controller = new AbortController();

const request = client.endpoints.profile.get(
  456,
  {
    signal: controller.signal,
    timeoutMs: 15_000
  }
);

controller.abort();

await request;
```

</details>

## Параметры запросов

Большинство методов принимают объект параметров запроса последним аргументом:

```typescript
const options = {
  timeoutMs: 15_000,
  signal: controller.signal,
  apiVersion: 2,
  throwOnAnixartError: true
};
```

| Параметр              | Тип           | Описание                                                        |
| --------------------- | ------------- | --------------------------------------------------------------- |
| `timeoutMs`           | `number`      | Максимальное время выполнения запроса в миллисекундах.          |
| `signal`              | `AbortSignal` | Сигнал для отмены запроса.                                      |
| `apiVersion`          | `number`      | Версия API для конкретного запроса.                             |
| `throwOnAnixartError` | `boolean`     | Управляет выбрасыванием ошибок Anixart для конкретного запроса. |

Не все версии API возвращают ответы одинаковой структуры, поэтому при использовании `apiVersion` учитывайте тип ответа конкретного эндпоинта.

## Обработка ошибок

AnixartJS экспортирует отдельные классы для ошибок API и HTTP:

```typescript
import {
  Anixart,
  AnixartError,
  HttpError
} from "anixartjs";

const client = new Anixart({});

try {
  const { profile } = await client.endpoints.profile.get(
    456,
    { timeoutMs: 15_000 }
  );

  console.log(profile.login);
} catch (error) {
  if (error instanceof AnixartError) {
    console.error(
      `Ошибка Anixart: ${error.code} (${error.codeName})`
    );
    return;
  }

  if (error instanceof HttpError) {
    console.error(`HTTP-ошибка: ${error.status}`);
    return;
  }

  if (error instanceof Error && error.name === "AbortError") {
    console.error("Запрос отменён.");
    return;
  }

  if (error instanceof Error && error.name === "TimeoutError") {
    console.error("Истёк таймаут запроса.");
    return;
  }

  throw error;
}
```

## Дополнительные возможности

### ArticleBuilder

В библиотеку входит `ArticleBuilder`, предназначенный для формирования содержимого статей.

Подробный пример:

[docs/examples/article-builder.md](docs/examples/article-builder.md)

Пример создания статьи:

[docs/examples/create-article.md](docs/examples/create-article.md)

### Парсеры ссылок

AnixartJS также экспортирует парсеры ссылок для поддерживаемых источников видео.

Подробнее:

[docs/examples/parsers.md](docs/examples/parsers.md)

## Примеры

В директории [`examples`](examples) находятся готовые запускаемые примеры:

* [`signIn.js`](examples/signIn.js) — авторизация и установка токена;
* [`searchReleases.js`](examples/searchReleases.js) — поиск релизов;
* [`getProfile.js`](examples/getProfile.js) — получение профиля, таймаут и отмена запроса;
* [`getBookmarks.js`](examples/getBookmarks.js) — работа с закладками и пагинацией;
* [`createArticle.js`](examples/createArticle.js) — создание статьи;
* [`linkParser.js`](examples/linkParser.js) — работа с парсерами ссылок.

Подробности находятся в [`examples/README.md`](examples/README.md).

## Документация

Расширенная документация находится в директории [`docs`](docs).

Основные разделы:

* [Начало работы](docs/guide/getting-started.md)
* [Аутентификация](docs/guide/authentication.md)
* [Запросы](docs/guide/requests.md)
* [Обработка ошибок](docs/guide/errors.md)
* [Пагинация](docs/guide/pagination.md)
* [Примеры](docs/examples)
* [Справочник API](docs/reference)

Документация построена на VitePress, а справочник API генерируется с помощью TypeDoc.

## Проекты, использующие AnixartJS

| Проект                                             | Описание                                                                      |
| -------------------------------------------------- | ----------------------------------------------------------------------------- |
| [AniDesk](https://github.com/theDesConnet/AniDesk) | Неофициальный десктоп-клиент Anixart.                                         |
| [AnixApp](https://github.com/Maks1mio/anixapp)     | Неофициальное приложение Anixart для ПК с функционалом совместного просмотра. |

## Вклад в проект

Вклад в развитие AnixartJS приветствуется.

Вы можете:

* сообщить об ошибке через [Issues](https://github.com/theDesConnet/AnixartJS/issues);
* предложить улучшение;
* добавить или обновить эндпоинт;
* исправить типы или модели;
* улучшить документацию;
* добавить пример;
* отправить pull request.

Перед отправкой изменений рекомендуется проверить сборку и типы:

```bash
npm install
npm run build
npm run test:typecheck
```

## Лицензия

Проект распространяется под лицензией **GPL-2.0**.

Подробности находятся в файле [LICENSE](LICENSE).

---

<div align="center">

Если у вас есть вопросы, предложения или вы нашли проблему, откройте [issue](https://github.com/theDesConnet/AnixartJS/issues).

</div>
