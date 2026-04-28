export function getElements() {
    const elements = document.querySelectorAll(".room, .staircase");
    const floor = document.querySelector(".floorplan");
    const floorRect = floor.getBoundingClientRect();

    const result = [];

    elements.forEach(el => {
        const rect = el.getBoundingClientRect();

        result.push({
            name: el.dataset.name,
            type: el.dataset.type,
            x1: rect.left - floorRect.left,
            y1: rect.top - floorRect.top,
            x2: rect.right - floorRect.left,
            y2: rect.bottom - floorRect.top
        });
    });

    return { result, floorRect };
}

export function getCenters(elements, floorRect, GRID_SIZE) {
    const res = {};

    elements.forEach(el => {
        const cx = (el.x1 + el.x2) / 2;
        const cy = (el.y1 + el.y2) / 2;

        res[el.name] = {
            x: Math.floor(cx / floorRect.width * GRID_SIZE) + 3,
            y: Math.floor(cy / floorRect.height * GRID_SIZE)
        };
    });

    return res;
}