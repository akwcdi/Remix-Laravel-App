## 1.1 環境変数の準備

以下の環境変数を.env として同階層にコピー

ルートディレクトリ

```sh
.env.development
```

/backend

```sh
.env.local
```

/server

```sh
.env.server
```

## 1.2 コンテナの準備

初回立ち上げ

```sh
make build
```

2 回目以降

```sh
make up
```

終了時

```sh
make down
```

## 1.3 backend コンテナ内に composer をインストール

```sh
docker-compose exec backend composer install
```

## 2.1 ルートディレクトリで pnpm インストール

```sh
pnpm install
```

```sh
pnpm run dev
```

(初回立ち上げ時に「Invalid URL」エラーが出た時は pnpm add dotenv)

## Deployment

First, build your app for production:

```sh
pnpm run build
```

Then run the app in production mode:

```sh
pnpm start
```

Now you'll need to pick a host to deploy it to.

### DIY

If you're familiar with deploying node applications, the built-in Remix app server is production-ready.

Make sure to deploy the output of `remix build`

- `build/`
- `public/build/`

### Using a Template

When you ran `npx create-remix@latest` there were a few choices for hosting. You can run that again to create a new project, then copy over your `app/` folder to the new project that's pre-configured for your target server.

```sh
cd ..
# create a new project, and pick a pre-configured host
npx create-remix@latest
cd my-new-remix-app
# remove the new project's app (not the old one!)
rm -rf app
# copy your app over
cp -R ../my-old-remix-app/app app
```
