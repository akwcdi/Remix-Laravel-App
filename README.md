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

## 2.1 サイト立ち上げ

```sh
pnpm run dev
```
