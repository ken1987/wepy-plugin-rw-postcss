# wepy-plugin-rw-postcss

给 wepy 用的 postcss 插件

## 注意

* node >= 8.0
* 目前版本只支持通过 postcss 配置文件（推荐 .postcssrc ）来配置

## 安装

```
yarn add wepy-plugin-rw-postcss
# or
npm install wepy-plugin-rw-postcss --sava-dev
```

## 使用

wepy.config.js

```js
{
  plugins: {
    // 不需要填任何配置，目前版本只支持通过 postcss 配置文件（推荐 .postcssrc ）来配置
    'rw-postcss': {}
  }
}
```

.postcssrc

请保证已经安装了配置的插件

```json
{
    "plugins": {
        "autoprefixer": {},
        "wx-px2rpx": {}
    }
}
```
