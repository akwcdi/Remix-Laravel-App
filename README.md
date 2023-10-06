## 1.1 環境変数の準備

以下の環境変数を.env として同階層にコピー

ルートディレクトリ

```sh
.env.development
```

/backend

```sh
.env.example
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

## 2.1 ルートディレクトリで pnpm インストール

```sh
pnpm install
```

```sh
pnpm run dev
```

(初回立ち上げ時に「Invalid URL」エラーが出た時は pnpm add dotenv)
