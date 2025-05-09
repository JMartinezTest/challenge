import { defineConfig } from "cypress";

module.exports = defineConfig({
  e2e: {
    experimentalModifyObstructiveThirdPartyCode: true,
    experimentalOriginDependencies: true,
    testIsolation: false,
  },
});
