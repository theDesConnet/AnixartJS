# Публикация статьи с изображением

::: danger Операция записи
Пример действительно публикует статью в вашем канале. Используйте тестовый канал,
на который у аккаунта есть права. Без флага `--publish` запросы не отправляются.
:::

## Последовательность

1. Прочитать изображение с диска.
2. Проверить доступность редактора и получить медиатокен.
3. Загрузить изображение и подготовить встраиваемую ссылку.
4. Собрать блоки через `ArticleBuilder`.
5. Создать статью и получить её ID.

Токен аккаунта передаётся клиенту, а медиатокен — непосредственно методам медиа.
Не заменяйте один другим. Для изображения используйте результат загрузки Anixart,
а не произвольный URL.

## Готовый пример

Установите `anixartjs`. Сохраните как `createArticle.js` в CommonJS-проекте:

```js
const { Anixart, ArticleBuilder } = require("anixartjs");
const { readFile } = require("node:fs/promises");

async function main() {
  if (!process.argv.includes("--publish")) {
    console.log("Пример загружает изображение и публикует статью в выбранном канале.");
    console.log("Укажите ANIXART_TOKEN, ANIXART_CHANNEL_ID, ARTICLE_IMAGE и запустите с --publish.");
    return;
  }

  const token = process.env.ANIXART_TOKEN;
  const channelId = Number(process.env.ANIXART_CHANNEL_ID);
  const imagePath = process.env.ARTICLE_IMAGE;

  if (!token || !Number.isSafeInteger(channelId) || channelId <= 0 || !imagePath) {
    throw new Error("Нужны ANIXART_TOKEN, положительный ANIXART_CHANNEL_ID и путь ARTICLE_IMAGE.");
  }

  const imageBuffer = await readFile(imagePath);
  const client = new Anixart({ token });
  const options = { timeoutMs: 30_000, throwOnAnixartError: true };

  const editor = await client.endpoints.channel.editorAvaliable(
    channelId,
    false,
    false,
    options,
  );
  const mediaToken = editor.media_upload_token;

  if (!mediaToken) {
    throw new Error("Редактор не вернул токен загрузки медиа. Проверьте права на канал.");
  }

  const image = await client.endpoints.article.uploadArticleImage(
    mediaToken,
    imageBuffer,
    options,
  );

  if (image.success !== 1 || !image.file) {
    throw new Error("Не удалось загрузить изображение.");
  }

  const embed = await client.endpoints.article.generateEmbedData(
    "link",
    mediaToken,
    "https://anixart.tv/release/1",
    options,
  );

  if (embed.success !== 1) {
    throw new Error("Не удалось подготовить встроенную ссылку.");
  }

  const article = new ArticleBuilder()
    .setSignedState(true)
    .addBlocks([
      {
        type: "header",
        text: "Пример статьи",
        level: 3,
      },
      {
        type: "paragraph",
        text: "Эта статья создана с помощью AnixartJS и ArticleBuilder.",
      },
      {
        type: "quote",
        text: "Здесь можно разместить цитату.",
        caption: "Автор цитаты",
      },
      {
        type: "unorderedList",
        items: ["Первый пункт", "Второй пункт", "Третий пункт"],
      },
      {
        type: "orderedList",
        items: ["Первый шаг", "Второй шаг", "Третий шаг"],
      },
      {
        type: "delimiter",
      },
      {
        type: "embed",
        data: embed,
      },
      {
        type: "media",
        items: [image.file],
      },
    ])
    .build();

  const result = await client.endpoints.article.create(
    channelId,
    article,
    options,
  );

  console.log("Статья создана. ID:", result.article.id);
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : String(error));
  process.exitCode = 1;
});
```

## Запуск

Сначала проверьте подсказку без публикации:

```sh
node createArticle.js
```

Для публикации в PowerShell:

```powershell
$env:ANIXART_TOKEN = "YOUR_ANIXART_TOKEN"
$env:ANIXART_CHANNEL_ID = "YOUR_CHANNEL_ID"
$env:ARTICLE_IMAGE = "./image.jpg"
node createArticle.js --publish
```

Замените `YOUR_CHANNEL_ID` числовым ID своего канала.

::: warning Таймаут после отправки
Не запускайте пример повторно вслепую: статья могла создаться, даже если ответ
не дошёл. Сначала проверьте канал. Пример не удаляет опубликованную статью автоматически.
:::
