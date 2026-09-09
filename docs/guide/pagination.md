# Пагинация и закладки

Страницы в рассматриваемых методах нумеруются с `0`. Формат пагинации зависит от метода:
не применяйте одну структуру ответа ко всему API.

## Постраничный ответ

| Поле | Значение |
| --- | --- |
| `content` | Элементы текущей страницы |
| `current_page` | Текущая страница |
| `total_count` | Общее количество элементов |
| `total_page_count` | Общее количество страниц |

Поиск API v2 использует другой формат — [см. поиск релизов](/examples/search).

## Чтение своих закладок

Установите `anixartjs` и сохраните пример как `getBookmarks.js` в CommonJS-проекте.
Он читает максимум три страницы и ничего не изменяет.

```js
const { Anixart, BookmarkType, BookmarkSortType } = require("anixartjs");

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
```

Запуск в PowerShell:

```powershell
$env:ANIXART_TOKEN = "YOUR_ANIXART_TOKEN"
node getBookmarks.js
```

## Важные детали

- Запрашивайте страницы последовательно, а не создавайте сотни запросов сразу.
- Ограничивайте число страниц и прекращайте обход при пустом результате.
- `undefined` перед `options` сохраняет позицию необязательного аргумента фильтра.
- При изменении данных между запросами возможны повторы и пропуски элементов:
  постраничный обход не является снимком базы данных.
