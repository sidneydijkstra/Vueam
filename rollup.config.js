import packageInfo from './package.json'

import json from '@rollup/plugin-json'
import vue from 'rollup-plugin-vue'
import node from '@rollup/plugin-node-resolve'
import cjs from '@rollup/plugin-commonjs'
import babel from '@rollup/plugin-babel'
import terser from '@rollup/plugin-terser'

import fs from 'fs'
import path from 'path'

const baseFolderPath = './src/'
const banner = `/*! Vueam Library v${packageInfo.version} */\n`

const components = fs.readdirSync(baseFolderPath).filter((f) =>
    fs.statSync(path.join(baseFolderPath, f)).isDirectory()
)

const entries = {
    'index': './src/index.js',
    ...components.reduce((obj, name) => {
        obj[name] = (baseFolderPath + name)
        return obj
    }, {})
}

const babelOptions = {
    babelHelpers: 'bundled'
}

const vuePluginConfig = {
    template: {
        isProduction: true,
        compilerOptions: {
            whitespace: 'condense'
        }
    }
}

const plugins = [
    json(),
    node({
        extensions: ['.vue', '.js']
    }),
    vue(vuePluginConfig),
    babel(babelOptions),
    cjs()
]

const capitalize = (s) => {
    if (typeof s !== 'string') return ''
    return s.charAt(0).toUpperCase() + s.slice(1)
}

export default () => {
    let config = [{
        input: entries,
        external: ['vue'],
        output: {
            format: 'esm',
            dir: `dist/esm`,
            entryFileNames: '[name].mjs',
            chunkFileNames: '[name]-[hash].mjs',
        },
        plugins: plugins
    },
    {
        input: 'src/index.js',
        external: ['vue'],
        output: {
            format: 'esm',
            file: 'dist/vueam.mjs',
            banner: banner
        },
        plugins: plugins
    },
    {
        input: entries,
        external: ['vue'],
        output: {
            format: 'cjs',
            dir: 'dist/cjs',
            exports: 'named'
        },
        plugins: plugins
    },
    {
        input: 'src/index.js',
        external: ['vue'],
        output: {
            format: 'umd',
            name: capitalize('vueam'),
            file: 'dist/vueam.js',
            exports: 'named',
            banner: banner,
            globals: {
                vue: 'Vue'
            }
        },
        plugins: plugins
    }]

    if (process.env.MINIFY === 'true') {
        config = config.filter((c) => !!c.output.file)
        config.forEach((c) => {
            c.output.file = c.output.file.replace(/\.m?js/g, r => `.min${r}`)
            c.plugins.push(terser({
                output: {
                    comments: '/^!/'
                }
            }))
        })
    }

    return config
}