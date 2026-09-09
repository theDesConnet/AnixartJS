const { Anixart, ArticleBuilder } = require("../dist/index");
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
