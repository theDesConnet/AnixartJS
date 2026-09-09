const {
  AniLibriaParser,
  SibnetParser,
  KodikParser,
  VKVideoParser,
  OKParser,
  RutubeParser,
} = require("../dist/index");

const examples = [
  {
    name: "Kodik",
    parser: KodikParser,
    link: "https://kodikplayer.com/seria/1557363/b59e31986e46223233dfb6df4f1c5e7e/720p",
  },
  {
    name: "Sibnet",
    parser: SibnetParser,
    link: "https://video.sibnet.ru/shell.php?videoid=3200676",
  },
  {
    name: "AniLibria",
    parser: AniLibriaParser,
    link: "https://anixart.libria.fun/public/iframe.php?id=8896&ep=11",
  },
  {
    name: "VK Video",
    parser: VKVideoParser,
    link: "https://vkvideo.ru/video_ext.php?oid=-56169357&id=456266651&hash=d42633f4aa6dd48f",
  },
  {
    name: "OK",
    parser: OKParser,
    link: "https://ok.ru/videoembed/10214009801418?nochat=1",
  },
  {
    name: "Rutube",
    parser: RutubeParser,
    link: process.env.RUTUBE_URL ?? "",
  },
];

async function main() {
  for (const { name, parser, link } of examples) {
    console.log(`\n=== ${name} ===`);

    if (!link) {
      console.log("Пропущено: задайте RUTUBE_URL в формате https://rutube.ru/play/embed/VIDEO_ID/.");
      continue;
    }

    try {
      const links = await parser.getDirectLinks(link, {
        timeoutMs: 20_000,
      });

      if (!links || Object.keys(links).length === 0) {
        console.log("Ссылки на видео не найдены.");
        continue;
      }

      for (const [quality, sources] of Object.entries(links)) {
        const label = quality === "unknown" ? "Качество не указано" : `${quality}p`;
        console.log(label);

        for (const source of sources) {
          console.log(`  URL: ${source.src}`);
          if (source.type) console.log(`  Тип: ${source.type}`);
        }
      }
    } catch (error) {
      console.error(`${name}: ${error instanceof Error ? error.message : String(error)}`);
      process.exitCode = 1;
    }
  }
}

main().catch((error) => {
  console.error("Не удалось выполнить пример:", error);
  process.exitCode = 1;
});
