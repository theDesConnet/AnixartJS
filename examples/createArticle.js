const { ArticleBuilder } = require('../dist/utils/ArticleBuilder');
const { Anixart } = require('../dist/index');
const fs = require('fs');

const a = new Anixart({ token: "API_TOKEN" }); // Вставьте свой токен



setTimeout(async () => {
    const channel = await a.getChannelById(2585);
    const token = await channel.getMediaToken(false, false);

    // Загрузка изображения на сервера Anixart (из других источников не даст создать)
    const image = await a.endpoints.channel.uploadArticleImage(token, fs.readFileSync("./test.jpg"));

    // Встраивание ссылки в пост
    const embed = await a.endpoints.channel.generateEmbedData("link", token, "https://anixart.tv/release/1");

    const aBuilder = new ArticleBuilder().addBlocks([{
        type: "paragraph",
        text: "It's a paragraph"
    }, {
        type: "header",
        text: "It's a header"
    }, {
        type: "quote",
        text: "It's a quote",
        caption: "It's a caption"
    }, {
        type: "unorderedList",
        items: ["Item 1", "Item 2", "Item 3"]
    }, {
        type: "orderedList",
        items: ["Item 1", "Item 2", "Item 3"]
    }, {
        type: "delimiter"
    },{
        type: "embed",
        data: embed
    }, {
        type: "media",
        items: [image.file]
    }]);

    console.log(await channel.createArticle(aBuilder)); // Создаём пост и выводим его;
}, 1000);
