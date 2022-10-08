/*
 * @Author: KrisLee 2030000020@qq.com
 * @Date: 2022-10-08 20:42:37
 * @LastEditors: KrisLee 2030000020@qq.com
 * @LastEditTime: 2022-10-08 21:49:55
 * @FilePath: /volc-sdk-js/volcengine-sdk/rollup.config.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import {terser} from "rollup-plugin-terser";
import json from '@rollup/plugin-json';
import { babel } from '@rollup/plugin-babel';
import autoExternal from 'rollup-plugin-auto-external';
import bundleSize from 'rollup-plugin-bundle-size'

const lib = require("./package.json");
const outputFileName = 'volcengine-sdk';
const name = "VolcengineSDK";
const input = './index.js';

const buildConfig = ({es5, browser = true, minifiedVersion = true, ...config}) => {

  const build = ({minified}) => ({
    input,
    ...config,
    output: {
      ...config.output,
      file: `${config.output.file}.${minified ? "min.js" : "js"}`
    },
    plugins: [
      json(),
      resolve({browser}),
      commonjs(),
      minified && terser(),
      minified && bundleSize(),
      ...(es5 ? [babel({
        babelHelpers: 'bundled',
        presets: ['@babel/preset-env']
      })] : []),
      ...(config.plugins || []),
    ]
  });

  const configs = [
    build({minified: false}),
  ];

  if (minifiedVersion) {
    configs.push(build({minified: true}))
  }

  return configs;
};

export default async () => {
  const year = new Date().getFullYear();
  const banner = `// Volcengine-sdk v${lib.version} Copyright (c) ${year} ${lib.author}`;

  return [
    ...buildConfig({
      es5: true,
      output: {
        file: `dist/${outputFileName}`,
        name,
        format: "umd",
        exports: "default",
        banner
      }
    }),

    ...buildConfig({
      output: {
        file: `dist/esm/${outputFileName}`,
        format: "esm",
        preferConst: true,
        exports: "named",
        banner
      }
    }),
    // Node.js commonjs build
    {
      input,
      output: {
        file: `dist/node/${name}.cjs`,
        format: "cjs",
        preferConst: true,
        exports: "default",
        banner
      },
      plugins: [
        autoExternal(),
        resolve(),
        commonjs()
      ]
    }
  ]
};
