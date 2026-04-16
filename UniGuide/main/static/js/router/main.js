import { GRID_SIZE } from "./config.js";
import { getElements, getCenters } from "./coordinates.js";
import { createGrid, fillGrid } from "./grid.js";
import { astar } from "./astar.js";
import { drawPath } from "./render.js";

console.log("MAIN JS LOADED");

export function runRouting(from, to) {
    const { result, floorRect } = getElements();

    const grid = createGrid(GRID_SIZE);
    fillGrid(grid, result, floorRect, GRID_SIZE);

    const centers = getCenters(result, floorRect, GRID_SIZE);

    const path = astar(grid, centers[from], centers[to], GRID_SIZE);

    drawPath(path, GRID_SIZE);

    console.log("PATH:", path);
}

window.runRouting = runRouting;