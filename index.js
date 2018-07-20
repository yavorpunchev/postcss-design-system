const postcss = require('postcss');
const readFile = require('fs-readfile-promise');
const { forEach } = require('lodash');

module.exports = postcss.plugin('postcss-design-system', function(options) {
  options = options || {
    inputFile: './theme.json',
  };
  return function(css) {
    const rootRule = postcss.rule({ selector: ':root' });
    css.root().prepend(rootRule);
    return readFile(options.inputFile).then(buffer => {
      const object = JSON.parse(buffer.toString());
      forEach(object, (objectValue, objectKey) => {
        forEach(objectValue, (value, key) => {
          let prefix, suffix;
          switch (objectKey) {
            default:
              prefix = objectKey;
              suffix = '';
              break;
            case 'breakpoints':
              prefix = 'breakpoint';
              suffix = 'em';
              break;
            case 'space':
              prefix = 'space';
              suffix = 'px';
              break;
            case 'fontSizes':
              prefix = 'fontSize';
              suffix = 'px';
              break;
            case 'radii':
              prefix = 'borderRadius';
              suffix = 'px';
              break;
            case 'fonts':
              prefix = 'fontFamily';
              suffix = '';
              break;
            case 'colors':
              prefix = 'color-';
              suffix = '';
              break;
          }
          rootRule.append(
            postcss.decl({
              prop: '--' + prefix + key,
              value: value + suffix,
            })
          );
        });
      });
    });
  };
});
