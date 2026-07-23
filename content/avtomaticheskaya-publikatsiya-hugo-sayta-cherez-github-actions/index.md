+++
date = '2026-07-23T13:00:00+03:00'
draft = false
title = 'Автоматическая публикация Hugo-сайта через GitHub Actions: современный подход'
author = 'Керим'
image = 'featured.jpg'

tags = [
"генератор-сайтов",
"hugo",
"github-actions",
"github-pages",
"ci-cd",
"автоматизация"
]

categories = [
"Разработка сайтов",
"Инструменты"
]
+++

# Автоматическая публикация Hugo-сайта через GitHub Actions

При работе с Hugo у разработчика есть два разных типа файлов:

- **исходный проект сайта** — файлы, которые мы редактируем;
- **сгенерированный статический сайт** — готовые HTML, CSS и JavaScript-файлы, которые публикуются на сервере.

Многие начинающие пользователи Hugo сталкиваются с вопросом: нужно ли хранить папку `public/` в Git или достаточно сохранить только исходный проект?

Современный и удобный подход — хранить только исходный код Hugo-проекта, а генерацию и публикацию полностью автоматизировать через GitHub Actions.

---

# Как работает этот подход

Вместо ручной генерации сайта процесс выглядит так:

```

Изменения в Hugo-проекте
↓
git push
↓
GitHub Actions запускается автоматически
↓
Установка Hugo
↓
Генерация статического сайта
↓
Публикация результата на GitHub Pages
↓
Сайт обновляется

```

Разработчику не нужно вручную создавать папку `public/` и загружать её на сервер.

---

# Структура проекта

В GitHub хранится только исходный Hugo-проект:

```

my-hugo-site/

├── archetypes/
├── assets/
├── content/
├── data/
├── layouts/
├── static/
├── themes/
│
├── hugo.toml
├── package.json
│
└── .github/
└── workflows/
└── deploy.yml

```

Папка:

```

public/

```

не добавляется в репозиторий.

Она создаётся автоматически при сборке.

---

# Почему не нужно хранить public/

Папка `public/` — это результат работы Hugo.

Она похожа на:

- `node_modules` в проектах Node.js;
- скомпилированные файлы CSS/JS;
- кеши и временные файлы.

Если удалить `public/`, сайт можно полностью восстановить одной командой:

```

hugo

```

Поэтому хранить её в Git обычно не имеет смысла.

---

# Настройка .gitignore

Создайте файл:

```

.gitignore

````

и добавьте:

```gitignore
/public/
/resources/
.hugo_build.lock
.DS_Store
````

Теперь Git будет игнорировать автоматически созданные файлы.

---

# Первый push проекта

После создания репозитория отправляем Hugo-проект:

```bash
git init

git add .

git commit -m "Initial Hugo website"

git branch -M main

git remote add origin https://github.com/user/my-hugo-site.git

git push -u origin main
```

Теперь GitHub хранит исходный код сайта.

---

# Создание GitHub Actions workflow

Создайте файл:

```
.github/workflows/deploy.yml
```

Добавьте:

```yaml
name: Deploy Hugo Site

on:
  push:
    branches:
      - main

permissions:
  contents: write

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout
        uses: actions/checkout@v4
        with:
          submodules: recursive

      - name: Setup Hugo
        uses: peaceiris/actions-hugo@v3
        with:
          hugo-version: 'latest'
          extended: true

      - name: Build
        run: hugo --minify

      - name: Deploy
        uses: peaceiris/actions-gh-pages@v4
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./public
```

---

# Настройка GitHub Pages

В настройках репозитория:

```
Settings
→ Pages
```

В разделе Source выберите:

```
GitHub Actions
```

Теперь GitHub будет использовать workflow для публикации сайта.

---

# Настройка собственного домена

Если используется собственный домен:

Например:

```
blog.example.com
```

создайте файл:

```
static/CNAME
```

Содержимое:

```
blog.example.com
```

Hugo автоматически перенесёт его в:

```
public/CNAME
```

GitHub Pages сохранит привязку домена после деплоя.

---

# Ежедневный процесс работы

После настройки всё становится очень просто.

Создаём новый пост:

```
content/blog/my-post.md
```

Или изменяем дизайн:

```
layouts/
assets/
static/
```

Проверяем локально:

```bash
hugo server
```

После изменений:

```bash
git add .

git commit -m "Update website"

git push
```

Через некоторое время GitHub Actions автоматически:

1. Запустит Hugo.
2. Создаст новую версию сайта.
3. Опубликует изменения.

---

# Итоговая схема

```
Компьютер разработчика

Hugo project
      |
      |
      git push
      ↓

GitHub Repository

      |
      |
GitHub Actions

      |
      |
hugo --minify

      |
      |
Generated website

      |
      |
GitHub Pages

      |
      |
Посетители сайта
```

---

# Преимущества такого подхода

✅ Не нужно вручную загружать файлы сайта
✅ История изменений остаётся чистой
✅ Исходный код и готовый сайт разделены
✅ Каждое обновление проходит автоматически
✅ Можно легко восстановить сайт на новом компьютере
✅ Подходит для блогов, документации и корпоративных сайтов

Для современных статических сайтов Hugo + GitHub Actions является одним из самых удобных вариантов автоматической публикации.
