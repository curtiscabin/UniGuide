export function drawPath(path, GRID_SIZE) {
    const container = document.querySelector(".floorplan");

    path.forEach(p => {
        const dot = document.createElement("div");

        dot.classList.add("route-dot"); // 👈 важно

        dot.style.width = "8px";
        dot.style.height = "8px";
        dot.style.background = "red";
        dot.style.borderRadius = "50%";
        dot.style.position = "absolute";

        dot.style.left = (p.x / GRID_SIZE * 100) + "%";
        dot.style.top = (p.y / GRID_SIZE * 100) + "%";

        container.appendChild(dot);
    });
}