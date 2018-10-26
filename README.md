# sclean

A tool to clean obsolete hash-coded files, which created by building tools, like webpack, gulp.

## quick start

Install sclean:

```
npm install sclean -g
```

## command line

```
sclean <command> [args]
```

### `archive`: archive target directory to a zip file

```
sclean archive <directory>
```

### `restore`: restore target directory to last nth archive state

```
sclean restore <directory> [--index index]
```

- `index/i`: `int`, default `1`, last nth state to restore

### `clean`: clean obsolete hash-code files

```
sclean clean <directory> [--ext ext] [--hash hash]
```

- `ext/e`: `string`, default `html`, html extension
- `hash/H`: `int`, default `32`, hash length

## philosophy of cleaning obsolete files

1. find all hash codes from html files (hashes1)
2. find all hash codes from js files whose file name matches hashes1 (hashes2, async js bundles)
3. delete js and css files whose file name neither matches hashes1 nor hashes2

## addition

- sclean only clean js and css files, not other static files
