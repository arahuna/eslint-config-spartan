import eslintReact from '@eslint-react/eslint-plugin';
import { CONFIG_NAME_PREFIX, prefixes } from '../constants.js';
import { files } from '../utils/files.js';
import { warnToError } from '../utils/ruleUtils.js';
/** @import { Linter } from 'eslint' */
/** @import { ConfigWithExtends } from 'typescript-eslint' */
/** @import {ConfigParserOptions} from './typeEnabled.js' */

/**
 * @param {object} options
 * @param {Linter.Config['files']=} options.files Set the files for this config. By default, this applies to all js/ts variant file extensions.
 * @param {ConfigParserOptions=} options.parserOptions See <https://eslint-react.js.org/docs/configuration> for more information on the ParserOptions available.
 * @returns {Linter.Config} The ESLint configuration for React.
 */
export function reactTypeScript(options = {}) {
  return {
    name: `${CONFIG_NAME_PREFIX}/${reactTypeScript.name}`,
    files: options.files ?? [files.jsTs],
    plugins: {
      [prefixes.reactTypeScript]: /** @type {any} */ (eslintReact),
    },
    languageOptions: {
      parserOptions: options.parserOptions,
    },
    rules: {
      ...eslintReact.configs['recommended-type-checked'].rules,
      ...warnToError(eslintReact.configs['recommended-type-checked'].rules),
      '@eslint-react/naming-convention/use-state': 'error',
      '@eslint-react/prefer-shorthand-boolean': 'error',
      '@eslint/prefer-shorthand-fragments': 'error',
      // TODO: Get eslint stylistic to get 'react/self-closing-comp' in this mixin
      '@eslint-react/no-useless-fragment': 'error',
    },
  };
}
