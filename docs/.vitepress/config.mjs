import { defineConfig } from "vitepress";
import typedocSidebar from "../reference/generated/typedoc-sidebar.json" with { type: "json" };

const sectionNames = {
  api: "Эндпоинты",
  core: "Клиент и HTTP",
  index: "Типы и утилиты",
  article: "Статьи",
  collection: "Коллекции",
  notification: "Уведомления",
  profile: "Профиль",
  release: "Релизы",
  http: "HTTP-клиент"
};

function localizeSidebar(items) {
  return items.map((item) => {
    const children = item.items ? localizeSidebar(item.items) : undefined;
    const singleGroup = children?.length === 1 ? children[0] : undefined;

    if (singleGroup?.text === "Классы" && singleGroup.items?.length === 1) {
      return singleGroup.items[0];
    }

    return {
      ...item,
      text: sectionNames[item.text] ?? item.text,
      ...(children ? { items: children } : {})
    };
  });
}

const base = process.env.DOCS_BASE ?? "/";

if (!base.startsWith("/") || !base.endsWith("/")) {
  throw new Error("DOCS_BASE должен начинаться и заканчиваться символом /");
}

export default defineConfig({
  lang: "ru-RU",
  title: "AnixartJS",
  description: "Документация неофициальной библиотеки Anixart для Node.js",
  base,
  srcExclude: ["README.md"],
  head: [["meta", { name: "theme-color", content: "#7c3aed" }]],
  themeConfig: {
    nav: [
      { text: "Руководство", link: "/guide/getting-started" },
      { text: "Примеры", link: "/examples/search" },
      { text: "Справочник", link: "/reference/" }
    ],
    sidebar: [
      {
        text: "Начало работы",
        items: [
          { text: "Установка и первый запрос", link: "/guide/getting-started" },
          { text: "Авторизация", link: "/guide/authentication" },
          { text: "Параметры запросов", link: "/guide/requests" },
          { text: "Обработка ошибок", link: "/guide/errors" },
          { text: "Пагинация и закладки", link: "/guide/pagination" }
        ]
      },
      {
        text: "Примеры",
        items: [
          { text: "Поиск релизов", link: "/examples/search" },
          { text: "Парсинг ссылок", link: "/examples/parsers" },
          { text: "Подготовка статьи", link: "/examples/article-builder" },
          { text: "Публикация с изображением", link: "/examples/create-article" }
        ]
      },
      {
        text: "Справочник",
        items: [
          { text: "Обзор SDK", link: "/reference/" },
          { text: "Клиент Anixart", link: "/reference/client" },
          { text: "Все классы и типы", link: "/reference/generated/" }
        ]
      },
      {
        text: "Справочник библиотеки",
        collapsed: true,
        items: localizeSidebar(typedocSidebar)
      },
      {
        text: "Развитие документации",
        items: [{ text: "Как добавить страницу", link: "/contributing" }]
      }
    ],
    socialLinks: [{ icon: "github", link: "https://github.com/theDesConnet/AnixartJS" }],
    search: {
      provider: "local",
      options: {
        locales: {
          root: {
            translations: {
              button: { buttonText: "Поиск", buttonAriaLabel: "Поиск по документации" },
              modal: {
                noResultsText: "Ничего не найдено",
                resetButtonTitle: "Очистить",
                backButtonTitle: "Назад",
                displayDetails: "Показать подробности",
                footer: { selectText: "выбрать", navigateText: "перейти", closeText: "закрыть" }
              }
            }
          }
        }
      }
    },
    outline: { label: "На этой странице", level: [2, 3] },
    docFooter: { prev: "Предыдущая страница", next: "Следующая страница" },
    sidebarMenuLabel: "Меню",
    returnToTopLabel: "Наверх",
    darkModeSwitchLabel: "Оформление",
    lightModeSwitchTitle: "Светлая тема",
    darkModeSwitchTitle: "Тёмная тема",
    skipToContentLabel: "Перейти к содержимому",
    footer: {
      message: "Неофициальный проект. Не связан с разработчиками Anixart.",
      copyright: "AnixartJS · GPL-2.0"
    }
  }
});
