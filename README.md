# Интернет магазин (Gulp + WebPack + Babel)

## Что делает Gulp?

- сжимает HTML в режиме `build`;
- удаляет комментарии из HTML в режиме `build`;
- собирает SCSS файлы, добавляет вендорные префиксы;
- удаляет комментарии из SCSS файлов;
- в режиме и `build` сжимает SCSS и делает копию без сжатия;
- конвертирует шрифты в `.ttf`, из `.ttf` в `woff/woff2`;
- создает файл для подключения шрифтов. Данный файл создается по такому пути: `src/scss/config/fonts.scss`.
- сжимает изображения и конвертирует их дополнительно в формат `webp` и подключает их если браузер поддерживает этот формат;
- копирует папку `/files` с содержимым в финальную сборку. То есть любые файлы можно поместить в эту папку и она будет добавлена в финальную сборку;
- отдельной коммандой `$ npm run svgSprive` cоздает "svg cпрайты";
- перед каждым запуском сборщика чистит папку с финальным проектом, чтобы не собирать муссор;
- отдельной коммандой `$ npm run zip` можно заархивировать финальную папку для заказчика **с именем проекта**;
- так же для разработи `gulp` запускает сервер с автоматической перезагрузкой окна в браузере при изменении файлов в проекте;
- отдельной коммандой `$ npm run deployFTP` финальный проект выгружается на хостинг. Опции для отправки проекта на нужный хостинг указываются в файле: `gulp/config/ftp.js`.

## Что делает WebPack?

- именно `webpack` в данной сборке занимается обработкой файлов c JavaScript;
- поддерживается модульное подключение скриптов `import/export`;
- при импорте нет необходимости писать расширение файла `.js`, так же если осуществляется импорт из файла `index.js` не обязательно это указывать:

```javascript
import * as flsFunctions from "./modules"; // './modules/index.js'
```

- `webpack` c помощью `babel` позволяет тебе писать код на любимом **ES6+**;
- в режиме `"production"` при финальной сборке файлы JS сжимаются.

## Финал

Сборка интернет магазина на GULP+Webpack.
