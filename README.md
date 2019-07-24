# sclean

[English documentation](./README.en.md)

一个用于清除由 webpack, gulp 等构建工具生成的过期的 hash 编码的文件.

## 快速开始

安装 sclean:

```
npm install sclean -g
```

## 命令行

```
sclean <command> [args]
```

### `archive`: 归档目标目录到一个 zip 文件

```
sclean archive <directory>
```

### `restore`: 恢复目标目录到最近第 n 次的归档状态

```
sclean restore <directory> [--index index]
```

- `index/i`: `int`, 默认是 `1`, 恢复到最近第 n 次状态

### `clean`: 清除过期的 hash 编码的文件

```
sclean clean <directory> [--ext ext] [--hash hash]
```

- `ext/e`: `type: string` 其他的 html 扩展名(用 `,` 分隔, 如 `--ext jsp,php`)
- `hash/H`: `type: int` `default: 32` hash 长度

## 清除过期的 hash 编码的文件的逻辑

1. 从 html 文件中找出所有的 hash codes (hashes1)
2. 从匹配 hashes1 的 js 文件中 找出所有的 hash codes (hashes2, 异步 js bundles)
3. 删除文件名既不匹配 hashes1、也不匹配 hashes2 的 js、css 文件

## 其他

- sclean 只能清理 js、css 文件, 不能清理其他静态文件
