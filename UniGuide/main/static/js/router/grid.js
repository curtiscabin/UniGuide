export function createGrid(GRID_SIZE) {
    return Array.from({ length: GRID_SIZE }, () =>
        Array(GRID_SIZE).fill(1)
    );
}

export function fillGrid(grid, elements, floorRect, GRID_SIZE, from, to) {
    const PADDING = 0;

    elements.forEach(el => {
        if (
            (el.type === "room" || el.type === "other") &&
            el.name !== from &&
            el.name !== to
        ) {

            const x1 = Math.floor(el.x1 / floorRect.width * GRID_SIZE);
            const y1 = Math.floor(el.y1 / floorRect.height * GRID_SIZE);
            const x2 = Math.floor(el.x2 / floorRect.width * GRID_SIZE);
            const y2 = Math.floor(el.y2 / floorRect.height * GRID_SIZE);

            for (let y = y1 - PADDING; y < y2 + PADDING; y++) {
                for (let x = x1 - PADDING; x < x2 + PADDING; x++) {
                    if (grid[y] && grid[y][x] !== undefined) {
                        grid[y][x] = 0;
                    }
                }
            }
        }
    });
}