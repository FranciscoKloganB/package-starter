/* eslint-disable @typescript-eslint/no-var-requires */

/**
 * Import our package the way we want our consumers to import it.
 *
 * E.g.: using default, named, ES, CJS, MJS imports.
 *
 * Depending on our target audience we might need to change the test-project TypeScript
 * `tsconfig.json` file. For instance "moduleResolution" may work differently when set
 * to `Node`, `ESNext`, `Bundler` or others. We need to ensure that it works how we want
 * it to.
 */

// CommonJS require
// const ADMT = require('@owner-or-organization/repository-name');
// console.log('CJS require import:', typeof ADMT.someFunction === 'function');

/** ModuleJS synthetic default import */
// import SPKG from '@owner-or-organization/repository-name';
// console.log('MJS synthetic default import:', typeof SPKG.someFunction === 'function');

/**  ModuleJS import */
// import * as APKG from '@owner-or-organization/repository-name';
// console.log('ModuleJS import', typeof APKG.someFunction === 'function');

/**  ModuleJS Destruct import  */
// import { someFunction } from '@owner-or-organization/repository-name';
// console.log('MJS named import destruct:', typeof someFunction === 'function');
