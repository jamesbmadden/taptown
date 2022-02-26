/**
 * Basically just a bunch of functions that many files could benefit from
 */
import { vec2 } from 'gl-matrix';

// how many screen pixels a tile takes up
const TILE_SIZE_PX = 200;

/**
 * Converts from coordinates of the screen to the tile in the game. It's LOCAL, which means it has to be adjusted by camera position.
 * @param x 
 * @param y 
 */
export function screenToGameCoords (x: number, y: number) {

  // first, get it based on the X/Y position, THEN change perspective
  // these two have a top-down perspective, and that must be adjusted by 45 degrees on both x and y axes
  const localX = x / TILE_SIZE_PX;
  // BOTTOM left of screen is 0, so this number will be negative
  const localY = (y - window.innerHeight) / TILE_SIZE_PX * 1.425;

  const gameCoords: vec2 = [localX, localY];

  // now use vectors to change perspective
  vec2.rotate(gameCoords, gameCoords, [0, 0], 45 * Math.PI / 180);

  return gameCoords;

}