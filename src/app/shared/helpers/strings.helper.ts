/**
 * Lowercase & remove spaces and replace them with dashes
 * @input Menu Config Panel
 * @return menu-config-panel
 */
export function normalizeName(name: string): string {
  return name.trim().toLowerCase().replace(/ /g, '-');
}

// /**
//  * Uppercase words & add spaces
//  * @input menu-config-panel
//  * @return Menu Config Panel
//  */
// export function deNormalizeName(name: string): string {
//   return name
//     .trim()
//     .split('-')
//     .map((name: string) => capitalizeFirstLetter(name))
//     .join(' ');
// }

// function capitalizeFirstLetter(word: string) {
//   return word.charAt(0).toUpperCase() + word.slice(1);
// }
