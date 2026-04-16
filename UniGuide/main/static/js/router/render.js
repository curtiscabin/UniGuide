export function drawPath(path, GRID_SIZE) {
    const container = document.querySelector(".floorplan");

    path.forEach(p => {
        const dot = document.createElement("div");

        dot.style.position = "absolute";
        dot.style.width = "4px";
        dot.style.height = "4px";
        dot.style.background = "red";

        dot.style.left = (p.x / GRID_SIZE * 100) + "%";
        dot.style.top = (p.y / GRID_SIZE * 100) + "%";

        container.appendChild(dot);
    });
}