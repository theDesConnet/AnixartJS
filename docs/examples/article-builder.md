# Подготовка статьи

`ArticleBuilder` собирает данные локально. Вызов `build()` не публикует статью
и не требует токена.

## Минимальный пример

Сохраните как `buildArticle.js` в CommonJS-проекте:

```js
const { ArticleBuilder } = require("anixartjs");

const article = new ArticleBuilder()
  .setSignedState(true)
  .addBlock({ type: "header", text: "Моя подборка", level: 3 })
  .addBlock({ type: "paragraph", text: "Несколько интересных релизов." })
  .addBlock({
    type: "unorderedList",
    items: ["Первый релиз", "Второй релиз"],
  })
  .build();

console.dir(article, { depth: null });
```

```sh
node buildArticle.js
```

## Блоки

| `type` | Основные данные |
| --- | --- |
| `paragraph` | `text` |
| `header` | `text`, необязательный `level` (по умолчанию 3) |
| `quote` | `text`, `caption`, необязательный `alignment` |
| `orderedList`, `unorderedList` | Массив строк `items` |
| `delimiter` | Дополнительные данные не нужны |
| `embed` | `data` из результата генерации embed |
| `media` | Массив объектов изображений `items` из загрузки медиа |

## Поведение builder

- Не более 25 блоков; превышение вызывает `RangeError`.
- `addBlocks()` добавляет весь набор или оставляет builder без изменений при ошибке.
- Исходные данные копируются; `build()` возвращает независимый результат.
- `setRepostArticle(id)` задаёт репост, `setRepostArticle(null)` убирает его.
- `returnBuildAricle()` — устаревший метод; используйте `build()`.

Следующий шаг — [публикация с изображением](./create-article).
