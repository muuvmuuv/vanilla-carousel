import babel from 'rollup-plugin-babel'
import typescript from 'rollup-plugin-typescript'
import scss from 'rollup-plugin-scss'
import { terser } from 'rollup-plugin-terser'
import changeCase from 'change-case'
import createBanner from 'create-banner'
import moment from 'moment'
import { writeFileSync } from 'fs'
import pkg from './package.json'

const name = changeCase.pascalCase(pkg.name)
const banner = createBanner({
  data: {
    name: name,
    date: moment().format('DD.MM.YYYY'),
  },
})

export default {
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
    babel(),
    terser({
      output: {
        comments: (_, { type, value }) => {
          if (type == 'comment2') {
            return new RegExp('VanillaCarousel').test(value)
          }
        },
      },
    }),
  ],
}
