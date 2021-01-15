import typescript from "rollup-plugin-typescript2";
import pkg from "./package.json";

export default {
  input: "src/main.ts",
  output: [
    {
      file: "dist/sliding-puzzle-examples-esm.js",
      format: "esm",
    },
  ],
  external: [
    ...Object.keys(pkg.dependencies || {}),
    ...Object.keys(pkg.peerDependencies || {}),
  ],
  plugins: [
    typescript({
      typescript: require("typescript"),
    }),
  ],
  preserveEntrySignatures: "strict",
  inlineDynamicImports: true,
};
