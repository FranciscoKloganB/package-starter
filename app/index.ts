/* eslint-disable @typescript-eslint/no-var-requires */
import { getWorld } from "@owner-or-organization/repository_name";

const utils = require("@owner-or-organization/repository_name");

console.log("CJS Require:", hello.getWorld("2021"));
console.log("MJS Import:", getWorld("2022"));

/**
 * This file serves only to test your publishable NPM package various import
 * statements and typings.
 *
 * Use `npm link` and try to import your stuff in this file.
 */
