const { Anixart } = require("../dist/index");

async function main() {
  const query = process.argv.slice(2).join(" ").trim() || "Наруто";
  const client = new Anixart({});
  if (process.env.ANIXART_TOKEN) client.setToken(process.env.ANIXART_TOKEN);

  const page = 0;
  const result = await client.endpoints.search.releases(
    { query },
    page,
    { apiVersion: 2, timeoutMs: 15_000 },
  );

  if (!("releases" in result) || !Array.isArray(result.releases)) {
    throw new Error("Неожиданный формат поиска API v2: отсутствует массив releases. Пересоберите пакет и проверьте версию API.");
  }

  const releases = result.releases;
  console.log("Запрос:", query);
  console.log("Получено на странице:", releases.length);
  if (result.related) console.log("Связанная группа:", result.related.name_ru);

  if (releases.length === 0) {
    console.log("На этой странице нет релизов.");
    return;
  }

  console.table(releases.map((release) => ({
    id: release.id,
    title: release.title_ru,
    episodes: `${release.episodes_released}/${release.episodes_total}`,
    grade: release.grade,
  })));
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : String(error));
  process.exitCode = 1;
});
