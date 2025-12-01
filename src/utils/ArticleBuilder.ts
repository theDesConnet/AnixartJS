import { IArticleCreateRequest, IArticlePayloadBlock, IArticleImageItem, IEmbedData } from "../types";
import { Article } from "../classes/Article";


export interface IArticleTextBlockBuilder {
    type: "paragraph" | "header",
    text: string
}

export interface IArticleQuoteBlockBuilder {
    type: "quote"
    text: string,
    caption: string
}

export interface IArticleListBlockBuilder {
    type: "orderedList" | "unorderedList",
    items: string[]
}

export interface IArticleDelimiterBlockBuilder {
    type: "delimiter"
}

export interface IArticleImageBlockBuilder {
    type: "media",
    items: IArticleImageItem[]
}

export interface IArticleEmbedBlockBuilder {
    type: "embed",
    data: IEmbedData
}

export class ArticleBuilder {
    private blocks: IArticlePayloadBlock[] = [];
    private isSigned: boolean = false;
    private repostArticleId: number | null = null;
    private readonly maxBlockCount: number = 25;
    private generateUniqueId(): string {
        const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_';
        let id = '';
        for (let i = 0; i < 9; i++) {
            id += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return id;
    }

    returnBuildAricle(): IArticleCreateRequest {
        return {
            is_signed: this.isSigned,
            repost_article_id: this.repostArticleId,
            payload: {
                time: Date.now(),
                version: "2.29.0-rc.1",
                blocks: this.blocks,
                block_count: this.blocks.length
            }
        };
    }

    public setSignedState(isSigned: boolean): ArticleBuilder {
        this.isSigned = isSigned;

        return this;
    }

    public setRepostArticle(article: Article | number): ArticleBuilder {
        this.repostArticleId = article instanceof Article ? article.id : article;

        return this;
    }

    public addBlock(data: IArticleTextBlockBuilder | IArticleQuoteBlockBuilder | IArticleListBlockBuilder | IArticleDelimiterBlockBuilder | IArticleImageBlockBuilder | IArticleEmbedBlockBuilder): ArticleBuilder {
        this.addBlocks([data]);

        return this;
    }

    public addBlocks(data: (IArticleTextBlockBuilder | IArticleQuoteBlockBuilder | IArticleListBlockBuilder | IArticleDelimiterBlockBuilder | IArticleImageBlockBuilder | IArticleEmbedBlockBuilder)[]): ArticleBuilder {
        for (const block of data) {
            if (this.blocks.length >= this.maxBlockCount) break;
            let baseBlock: IArticlePayloadBlock;

            switch (block.type) {
                case "paragraph":
                    baseBlock = {
                        id: this.generateUniqueId(),
                        type: block.type,
                        name: block.type,
                        data: {
                            text: block.text,
                            text_length: block.text.length
                        }
                    };
                    break;

                case "header":
                    baseBlock = {
                        id: this.generateUniqueId(),
                        type: block.type,
                        name: block.type,
                        data: {
                            text: block.text,
                            text_length: block.text.length,
                            level: 3
                        }
                    }
                    break;

                case "quote":
                    baseBlock = {
                        id: this.generateUniqueId(),
                        type: block.type,
                        name: block.type,
                        data: {
                            text: block.text,
                            caption: block.caption,
                            alignment: "left",
                            text_length: block.text.length,
                            caption_length: block.caption.length
                        }
                    }
                    break;

                case "delimiter":
                    baseBlock = {
                        id: this.generateUniqueId(),
                        type: block.type,
                        name: block.type,
                        data: {}
                    }
                    break;

                case "unorderedList":
                case "orderedList":
                    baseBlock = {
                        id: this.generateUniqueId(),
                        type: "list",
                        name: "list",
                        data: {
                            style: block.type == "orderedList" ? "ordered" : "unordered",
                            items: block.items,
                            item_count: block.items.length
                        }
                    }
                    break;

                case "media":
                    baseBlock = {
                        id: this.generateUniqueId(),
                        type: "media",
                        name: "media",
                        data: {
                            items: block.items,
                            item_count: block.items.length
                        }
                    }
                    break;

                case "embed":
                    baseBlock = {
                        id: this.generateUniqueId(),
                        type: block.type,
                        name: block.type,
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
                            service: block.data.site_name.toLowerCase() !== "youtube" || block.data.site_name.toLowerCase() !== "vk" ? "link" : block.data.site_name.toLowerCase()
                        }
                    };
                    break;

            }

            this.blocks.push(baseBlock);
        }

        return this;
    }
}