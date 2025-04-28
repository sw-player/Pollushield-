import resolve  from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import json     from "@rollup/plugin-json";        // JSON import 지원
import terser   from "@rollup/plugin-terser";

export default {
  input: "src/client.js",
  output: [
    {
      file: "demo/pollushield.umd.js",
      format: "umd",
      name: "PolluShield",
      plugins: [terser()]
    },
    {
      file: "demo/pollushield.esm.js",
      format: "esm",
      plugins: [terser()]
    }
  ],
  plugins: [
    resolve(),
    commonjs(),
    json()               // JSON 파일 로딩 지원
  ]
};
