const { Anixart, BookmarkType, BookmarkSortType } = require("../dist/index");

async function main() {
  const token = process.env.ANIXART_TOKEN;
  if (!token) throw new Error("Укажите ANIXART_TOKEN для чтения своих закладок.");

  const client = new Anixart({ token });
  const status = BookmarkType.Watching;
  const sort = BookmarkSortType.NewToOldAddTime;
  const maxPages = 3;
  let loaded = 0;

  for (let page = 0; page < maxPages; page++) {
    const result = await client.endpoints.profileList.get(
      status,
      page,
      sort,
      undefined,
      { timeoutMs: 15_000 },
    );

    if (result.content.length === 0) {
      console.log("Больше закладок нет. Загружено:", loaded);
      return;
    }

    console.log(`Страница ${page + 1}. Всего закладок: ${result.total_count}`);
    console.table(result.content.map((release) => ({
      id: release.id,
      title: release.title_ru,
    })));
    loaded += result.content.length;

    if (page + 1 >= result.total_page_count) {
      console.log("Загружены все страницы. Релизов:", loaded);
      return;
    }
  }

  console.log(`Загружено ${loaded} релизов. Достигнут лимит примера: ${maxPages} страницы.`);
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : String(error));
  process.exitCode = 1;
});
