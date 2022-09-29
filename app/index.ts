// Since esModuleInterop the two statements below are equivalent;
// const utilsCJS = require("@owner-or-organization/repository-name");
import * as pkg from "@owner-or-organization/repository-name";
// Spread MJS import
import { toHumanReadableString } from "@owner-or-organization/repository-name";

// To test default MJS export (must be provided by your pacakge) uncomment below
// import pkg from "@owner-or-organization/repository-name"
// console.log("MJS Default Import:", pkg, pkg.toHumanReadableString("2022"));

console.log("MJS Import:", toHumanReadableString("2022"));
console.log("CJS Require:", pkg, pkg.toHumanReadableString("2023"));

/**
 * This file serves only to test your publishable NPM package various import
 * statements and typings.
 *
 * Use `npm link` and try to import your stuff in this file.
 */
