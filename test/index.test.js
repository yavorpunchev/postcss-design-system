const postcss = require('postcss');
const plugin = require('./../');

function run(input, output, opts) {
  return postcss([plugin(opts)])
    .process(input)
    .then(result => {
      expect(result.css).toEqual(output);
      expect(result.warnings().length).toBe(0);
    });
}

const colorOutput = `:root {
    --breakpoint0: 30em;
    --breakpoint1: 48em;
    --space0: 5px;
    --space1: 10px;
    --fontSize0: 10px;
    --fontSize1: 12px;
    --borderRadius0: 3px;
    --borderRadius1: 4px;
    --fontFamily0: -apple-system, sans-serif;
    --color-white: #FFFFFF;
    --color-black: #000000
}`;

it('Should inject all variables in root correctly', () => {
  return run('', colorOutput, { inputFile: './test/theme.json' });
});
