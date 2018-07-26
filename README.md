# sclean

A tool to clean obsolete files with hash-code file names, created by building tools, such as webpack, gulp, etc(for server side).

## Quick start

Install sclean:

```
npm install sclean -g
```

Init:

```
sclean init
```

## 1. Command line.

```
sclean <command> [args]
```

### 1.1 `init`: Init current directory for clean.

```
sclean init
```

This command will generate a `sclean.config.js` file in current directory.

* `since`: `v0.0.1`

### 1.2 `archive/arc`: Archive target directory.

```
sclean archive
```

This command will pack target directory into a `zip` file. 

* `since`: `v0.0.1`

### 1.3 `restore`: Restore target directory to last nth archive state.

```
sclean restore [-i 1] [--index 2]
```

This command will restore target directory to last nth archive state from `zip` files.

* `since`: `v0.0.1`
* Can take `-i, --index` argument, which means last nth state, and default is `1`.

## 3. Project config.

Project config is defined in `sclean.config.js`. See [Detail project config](./docs/config.md).

### 3.1 Custom config for each developer.

Each developer can have his/her own private config. See [Project config - localOptions](./docs/config.md#localOptions).

### 3.2 Custom config for each module.

Each module can have its own private config. See [Project config - moduleOptions](./docs/config.md#moduleOptions).

### 3.3 Custom config for each command.

Each command can have its own private config. See [Project config - commandOptions](./docs/config.md#commandOptions).

### 3.4 More custom config from command line.

You can override config by pass arguments from command line.

##### Example:

```
sclean dev demo --devServerPort 9999
```

Now, the `devServerPort` config option become `9999`.

Also, you can put any extra configs through command line.

```
sclean dev demo --extraArg1 extraValu1 --extraArg2 extraValu2 --extraArg3
```

In your project config from `sclean.config.js`, there will be 3 more fields.

```
{
  ... // Original existed options.
  extraArg1: extraValu1,
  extraArg2: extraValu2,
  extraArg1: true
}
```

Relative reference: [minimist](https://github.com/substack/minimist).

### 3.5 Custom config loading sequences.

```
localOptions -> moduleOptions -> commandOptions -> cmdValues
```

The later loaded config values will override the former loaded config values.

## 4. Packages

* [webpack](https://webpack.js.org): 3.12.0
* [webpack-dev-middleware](https://github.com/webpack/webpack-dev-middleware): 2.0.6
* [webpack-hot-middleware](https://github.com/webpack-contrib/webpack-hot-middleware): 2.22.2
* [browser-sync](https://github.com/BrowserSync/browser-sync): 2.24.4
* [gulp](https://github.com/gulpjs/gulp): 4.0.0

More to see [package.json](./package.json).

## 5. Update to new version from old versions.

See [Change log](./CHANGELOG.md), [Update log](./UPDATE.md).

## 6. Examples

See [sclean examples](./examples).
