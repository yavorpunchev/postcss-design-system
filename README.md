# PostCSS Design System [![Build Status][ci-img]][ci]

[PostCSS] plugin for generating CSS custom properties (variables) from a JSON theme file. The theme config can come from any CSS-in-JS library's `<ThemeProvider>`, just like [styled-system](https://github.com/jxnblk/styled-system#configuration)'s one for example. It can also work with [Compositor Lab](compositor.io/lab).

[postcss]: https://github.com/postcss/postcss
[ci-img]: https://travis-ci.org/yavorpunchev/postcss-design-system.svg
[ci]: https://travis-ci.org/yavorpunchev/postcss-design-system

## Examples

An example JSON theme file:

```json
{
  "breakpoints": [30, 48, 74],
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

CSS variables get injected into `:root` selector:

```css
:root {
  --breakpoint0: 30em;
  --breakpoint1: 48em;
  --breakpoint2: 74em;
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
