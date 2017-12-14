const postcss = require('postcss');
const readFile = require('fs-readfile-promise');
const writeFile = require('fs-writefile-promise');
const { forEach } = require('lodash');

// Handling promises
const onRejected = err => console.log(err);
const onFulfilled = filename => console.log('Added a new file ' + filename);

// Convert an object to a string with CSS variables
const parseObject = object => {
    let result = '';
    forEach(object, (value, key) => {
        result += '  --' + key + ': ' + value + ';\n';
    });
    return result;
};

// Create a CSS file
const createFile = string => {
    const output = ':root{\n' + string + '}';
    return output;
};

// Convert to variables and write to a new file
const writeCSS = (buffer, output) => {
    const data = JSON.parse(buffer.toString());
    const colors = createFile(parseObject(data.colors));

    if (output !== undefined) {
        writeFile(output, colors)
            .then(onFulfilled)
            .catch(onRejected);
    }
};

module.exports = postcss.plugin('postcss-design-system', function (options) {
    options = options || {
        inputFile: './theme.json',
        outputFile: undefined
    };

    return function (css) {
        const variableRootRule = postcss.rule({ selector: ':root' });
        css.root().prepend(variableRootRule);

        return readFile(options.inputFile)
            .then(buffer => {
                const object = JSON.parse(buffer.toString());
                const colors = object.colors;

                forEach(colors, (value, key) => {
                    variableRootRule.append(
                        postcss.decl({
                            prop: '--' + key,
                            value: colors[key]
                        })
                    );
                    console.log(key + ' ' + colors[key]);
                });

                return buffer;
            })
            .then(buffer => writeCSS(buffer, options.outputFile));
    };
});
