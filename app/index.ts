// Since esModuleInterop the two statements below are equivalent;
// const helloCJS = require("@owner-or-organization/repository-name");
import * as helloCJS from "@owner-or-organization/repository-name";
// Spread MJS import
import { getWorld } from "@owner-or-organization/repository-name";

// To test default MJS export (must be provided by your pacakge) uncomment below
// import hello from "@owner-or-organization/repository-name"
// console.log("MJS Default Import:", hello, hello.getWorld());

console.log("MJS Import:", getWorld());
console.log("CJS Require:", helloCJS, helloCJS.getWorld());

/**
 * This file serves only to test your publishable NPM package various import
 * statements and typings.
 *
 * Use `npm link` and try to import your stuff in this file.
 */
