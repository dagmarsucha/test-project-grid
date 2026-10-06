import { IGridType } from './commonTypes';

// Mosaic pattern repeats every 6 tiles: tiles 3 and 4 are wide, the rest narrow
export function isWideTile(index: number): boolean {
  const position = index % 6;
  return position === 2 || position === 3;
}

export function getAspectRatioClass(gridType: IGridType, index: number): string {
  if (gridType === 'regular') {
    return 'o-ratio--4-3';
  }
  return isWideTile(index) ? 'ratio-wide' : 'ratio-rectangle';
}
