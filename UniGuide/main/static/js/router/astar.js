function heuristic(a, b) {
    return Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
}

function key(n) {
    return `${n.x},${n.y}`;
}

export function astar(grid, start, end, GRID_SIZE) {
    const open = [start];
    const cameFrom = {};

    const gScore = {};
    gScore[key(start)] = 0;

    const fScore = {};
    fScore[key(start)] = heuristic(start, end);

    while (open.length) {
        open.sort((a, b) => fScore[key(a)] - fScore[key(b)]);
        const current = open.shift();

        if (current.x === end.x && current.y === end.y) {
            const path = [];
            let cur = key(current);

            while (cameFrom[cur]) {
                const [x, y] = cur.split(',').map(Number);
                path.push({ x, y });
                cur = cameFrom[cur];
            }

            return path.reverse();
        }

        const neighbors = [
            { x: current.x + 1, y: current.y },
            { x: current.x - 1, y: current.y },
            { x: current.x, y: current.y + 1 },
            { x: current.x, y: current.y - 1 },
        ];

        neighbors.forEach(n => {
            if (
                n.x < 0 || n.y < 0 ||
                n.x >= GRID_SIZE || n.y >= GRID_SIZE ||
                grid[n.y][n.x] === 0
            ) return;

            const tentative = (gScore[key(current)] ?? Infinity) + 1;

            if (tentative < (gScore[key(n)] ?? Infinity)) {
                cameFrom[key(n)] = key(current);
                gScore[key(n)] = tentative;
                fScore[key(n)] = tentative + heuristic(n, end);

                if (!open.find(o => o.x === n.x && o.y === n.y)) {
                    open.push(n);
                }
            }
        });
    }

    return [];
}