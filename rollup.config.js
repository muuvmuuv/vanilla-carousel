const babel = require('rollup-plugin-babel')
const typescript = require('rollup-plugin-typescript')
const scss = require('rollup-plugin-scss')
const { terser } = require('rollup-plugin-terser')
const changeCase = require('change-case')
const createBanner = require('create-banner')
const { writeFileSync } = require('fs')
const pkg = require('./package.json')

const name = changeCase.pascalCase(pkg.name)
const banner = createBanner({
  data: {
    name: name,
  },
})

module.exports = {
  input: 'src/index.ts',
  output: [
    {
      banner,
      name,
      file: `dist/${pkg.name}.js`,
      format: 'umd',
    },
    {
      banner,
      file: `dist/${pkg.name}.common.js`,
      format: 'cjs',
    },
    {
      banner,
      file: `dist/${pkg.name}.esm.js`,
      format: 'esm',
    },
    {
      banner,
      name,
      file: `docs/${pkg.name}.js`,
      format: 'umd',
    },
  ],
  plugins: [
    scss({
      failOnError: true,
      outputStyle: 'compressed',
      output: styles => {
        writeFileSync(`dist/${pkg.name}.css`, styles)
        writeFileSync(`docs/${pkg.name}.css`, styles)
      },
    }),
    typescript(),
    babel({
      presets: [['@babel/env', { modules: false }]],
    }),
    terser({
      output: {
        comments: (node, { type, value }) => {
          if (type == 'comment2') {
            return new RegExp('VanillaCarousel').test(value)
          }
        },
      },
    }),
  ],
}
