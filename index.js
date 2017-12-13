const postcss = require('postcss');
const readFile = require('fs-readfile-promise');
const writeFile = require('fs-writefile-promise/lib/node7');

// On rejected promise
const onRejected = err => console.log(err);

// On fulfilled promise
const onFulfilled = filename => console.log(filename);

// Convert the colors object to variables
const parseColors = colors => {
    let output = ':root{\n';

    Object.entries(colors).forEach(([key, value]) => {
        output += '  --' + key + ': "' + value + '";\n';
    });

    output += '}';
    return output;
};

// Read JSON file, convert to variables and write to a new file
const readAndWrite = (buffer, output) => {
    const data = JSON.parse(buffer.toString());
    const colors = parseColors(data.colors);

    writeFile(output, colors)
        .then(onFulfilled)
        .catch(onRejected);
};

module.exports = postcss.plugin('postcss-design-system', function (options) {
    options = options || {
        inputFile: './theme.json',
        outputFile: './theme.css'
    };

    // Input and output destination come from options
    readFile(options.inputFile)
        .then(buffer => readAndWrite(buffer, options.outputFile))
        .catch(onRejected);
});
