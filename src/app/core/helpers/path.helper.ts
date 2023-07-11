/**
 * Get icon corespondent path to its svg
 * @example normalizedName = help-center
 * @input `normalized` name of svg
 */
export function getIconPath(normalizedName: string): string {
  const pathToSvgFolder = 'assets/svg';
  return `${pathToSvgFolder}/${normalizedName}.svg`;
}
