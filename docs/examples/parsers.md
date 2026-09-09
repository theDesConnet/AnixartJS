# Парсинг видеоссылок

Парсеры выделяют ссылки на видеопотоки из поддерживаемых источников.
Перед запуском [установите пакет из npm](/guide/getting-started).

## Kodik

Сохраните как `parseVideo.js`. Пример использует CommonJS. Для проекта с
`"type": "module"` замените первую строку на `import { KodikParser } from "anixartjs"`:

```js
const { KodikParser } = require("anixartjs");

async function main() {
  const url = process.env.VIDEO_URL;

  if (!url) {
    throw new Error("Задайте VIDEO_URL со ссылкой на видео Kodik");
  }

  const links = await KodikParser.getDirectLinks(url, { timeoutMs: 20_000 });

  for (const [quality, sources] of Object.entries(links)) {
    console.log("Качество:", quality);
    console.table(sources);
  }
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : "Ошибка парсинга");
  process.exitCode = 1;
});
```

В PowerShell:

```powershell
$env:VIDEO_URL = "https://kodikplayer.com/seria/1557363/b59e31986e46223233dfb6df4f1c5e7e/720p"
node parseVideo.js
```

## Доступные классы

`KodikParser`, `AniLibriaParser`, `SibnetParser`, `VKVideoParser`,
`OKParser`, `RutubeParser`.

::: warning Ограничения источников
Ссылки могут истекать или зависеть от IP, User-Agent и Referer.
Получение ссылки не гарантирует её воспроизведение в другом окружении.
Не публикуйте приватные и подписанные ссылки в логах общего доступа.
:::
