# PostCSS Design System [![Build Status][ci-img]][ci]

[PostCSS] plugin for generating CSS variables from a JSON file. The theme config works nicely with libraries like [styled-system](https://github.com/jxnblk/styled-system) and apps like [Compositor Lab](compositor.io/lab).

[postcss]: https://github.com/postcss/postcss
[ci-img]: https://travis-ci.org/yavorpunchev/postcss-design-system.svg
[ci]: https://travis-ci.org/yavorpunchev/postcss-design-system

An example JSON theme file:

```json
{
  "breakPoints": [30, 48, 74],
  "colors": {
    "white": "#FFFFFF",
    "black": "#000000"
  },
  "fonts": ["-apple-system, sans-serif"],
  "fontSizes": [14, 16, 18],
  "radii": [3, 6, 12],
  "space": [15, 20, 40]
}
```

CSS variables get injected into root:

```css
:root {
  --breakPoint0: 30em;
  --breakPoint1: 48em;
  --breakPoint2: 74em;
  --color-white: #ffffff;
  --color-black: #000000;
  --fontFamily0: -apple-system, sans-serif;
  --fontSize0: 14px;
  --fontSize1: 16px;
  --fontSize2: 18px;
  --borderRadius0: 3px;
  --borderRadius1: 6px;
  --borderRadius2: 12px;
  --space0: 15px;
  --space1: 20px;
  --space2: 40px;
}
```

## Usage

```js
postcss([
  require('postcss-design-system')({
    inputFile: './theme.json',
  }),
]);
```

See [PostCSS] docs for examples for your environment.
