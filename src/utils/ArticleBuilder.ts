import { randomInt } from "node:crypto";
import type {
  IArticle,
  IArticleCreateEditRequest,
  IArticleEmbedBlock,
  IArticleImageItem,
  IArticlePayloadBlock,
  IArticleQuoteBlock,
} from "../models";

export type IArticleTextBlockBuilder =
  | { type: "paragraph"; text: string }
  | { type: "header"; text: string; level?: number };

export interface IArticleQuoteBlockBuilder {
  type: "quote";
  text: string;
  caption: string;
  alignment?: IArticleQuoteBlock["alignment"];
}

export interface IArticleListBlockBuilder {
  type: "orderedList" | "unorderedList";
  items: string[];
}

export interface IArticleDelimiterBlockBuilder {
  type: "delimiter";
}

export interface IArticleImageBlockBuilder {
  type: "media";
  items: IArticleImageItem[];
}

export interface IArticleEmbedBlockBuilder {
  type: "embed";
  data: IArticleEmbedBlock;
}

export type ArticleBlockInput =
  | IArticleTextBlockBuilder
  | IArticleQuoteBlockBuilder
  | IArticleListBlockBuilder
  | IArticleDelimiterBlockBuilder
  | IArticleImageBlockBuilder
  | IArticleEmbedBlockBuilder;

/**
 * Собирает данные для создания или редактирования статьи без отправки запроса.
 * Лимит builder — 25 блоков; версия payload сохранена из исходной реализации.
 *
 * @example
 * const article = new ArticleBuilder()
 *   .setSignedState(true)
 *   .addBlock({ type: "header", text: "Моя подборка", level: 3 })
 *   .addBlock({ type: "paragraph", text: "Несколько интересных релизов." })
 *   .build();
 */
export class ArticleBuilder {
  private readonly blocks: IArticlePayloadBlock[] = [];
  private isSigned = false;
  private repostArticleId: number | null = null;
  private readonly maxBlockCount = 25;

  private generateUniqueId(usedIds: Set<string>): string {
    const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_";
    let id: string;

    do {
      id = Array.from({ length: 9 }, () => chars.charAt(randomInt(chars.length))).join("");
    } while (usedIds.has(id));

    usedIds.add(id);
    return id;
  }

  /** Возвращает независимую копию статьи — {@link IArticleCreateEditRequest}. */
  public build(): IArticleCreateEditRequest {
    return {
      is_signed: this.isSigned,
      repost_article_id: this.repostArticleId,
      payload: {
        time: Date.now(),
        version: "2.29.0-rc.1",
        blocks: structuredClone(this.blocks),
        block_count: this.blocks.length,
      },
    };
  }

  /** @deprecated Используйте {@link ArticleBuilder.build}. */
  public returnBuildAricle(): IArticleCreateEditRequest {
    return this.build();
  }

  /** Включает или отключает подпись автора. */
  public setSignedState(isSigned: boolean): this {
    this.isSigned = isSigned;
    return this;
  }

  /** Устанавливает репост по ID или объекту статьи; null убирает репост. */
  public setRepostArticle(article: Pick<IArticle, "id"> | number | null): this {
    const articleId = typeof article === "object" && article !== null ? article.id : article;

    if (articleId !== null && (!Number.isSafeInteger(articleId) || articleId <= 0)) {
      throw new RangeError("ID статьи должен быть положительным безопасным целым числом");
    }

    this.repostArticleId = articleId;
    return this;
  }

  /** Добавляет один блок, копируя его данные. */
  public addBlock(data: ArticleBlockInput): this {
    return this.addBlocks([data]);
  }

  /**
   * Добавляет всю пачку блоков или оставляет builder без изменений при ошибке.
   * Исходные массивы и объекты не сохраняются по ссылке.
   * @throws RangeError Если общее количество блоков превышает 25.
   */
  public addBlocks(data: readonly ArticleBlockInput[]): this {
    if (this.blocks.length + data.length > this.maxBlockCount) {
      throw new RangeError(`Максимум ${this.maxBlockCount} блоков в статье`);
    }

    const usedIds = new Set(this.blocks.map((block) => block.id));
    const blocks = data.map((block) =>
      this.createBlock(block, this.generateUniqueId(usedIds)),
    );

    this.blocks.push(...structuredClone(blocks));
    return this;
  }

  private createBlock(block: ArticleBlockInput, id: string): IArticlePayloadBlock {
    switch (block.type) {
      case "paragraph":
        return {
          id,
          type: "paragraph",
          name: "paragraph",
          data: { text: block.text, text_length: block.text.length },
        };

      case "header":
        return {
          id,
          type: "header",
          name: "header",
          data: {
            text: block.text,
            text_length: block.text.length,
            level: block.level ?? 3,
          },
        };

      case "quote":
        return {
          id,
          type: "quote",
          name: "quote",
          data: {
            text: block.text,
            caption: block.caption,
            alignment: block.alignment ?? "left",
            text_length: block.text.length,
            caption_length: block.caption.length,
          },
        };

      case "delimiter":
        return { id, type: "delimiter", name: "delimiter", data: {} };

      case "unorderedList":
      case "orderedList":
        return {
          id,
          type: "list",
          name: "list",
          data: {
            style: block.type === "orderedList" ? "ordered" : "unordered",
            items: block.items,
            item_count: block.items.length,
          },
        };

      case "media":
        return {
          id,
          type: "media",
          name: "media",
          data: { items: block.items, item_count: block.items.length },
        };

      case "embed":
        return {
          id,
          type: "embed",
          name: "embed",
          data: {
            hash: block.data.hash,
            embed: block.data.embed,
            image: block.data.image,
            site_name: block.data.site_name,
            title: block.data.title,
            description: block.data.description,
            width: block.data.width,
            height: block.data.height,
            url: block.data.url,
            service: block.data.service,
          },
        };

      default: {
        const unsupported: never = block;
        throw new TypeError(`Неизвестный тип блока: ${JSON.stringify(unsupported)}`);
      }
    }
  }
}
