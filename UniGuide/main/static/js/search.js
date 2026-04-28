// =======================
// INIT DOM
// =======================
const input = document.getElementById('searchInput');
const secondInput = document.getElementById('secondInput');
const resultsBox = document.getElementById('searchResults');
const searchButton = document.getElementById('searchButton');
const routeButton = document.getElementById('routeButton');
const clearButton = document.getElementById('clearButton');

let selectedIndex = -1;
let currentResults = [];
let isRouteMode = false;

// =======================
// CLEAR RESULTS
// =======================
function clearResults() {
    if (resultsBox) resultsBox.innerHTML = '';
    currentResults = [];
    selectedIndex = -1;
}

// =======================
// CLEAR PATH (важно: без import)
// =======================
function clearPath() {
    const container = document.querySelector(".floorplan");
    if (!container) return;
    container.querySelectorAll(".route-dot").forEach(el => el.remove());
}

// =======================
// SEARCH
// =======================
async function performSearch(query) {
    if (!query.trim()) {
        clearResults();
        return;
    }

    try {
        const response = await fetch(`/search/?q=${query}`);
        const data = await response.json();

        currentResults = data.results;
        resultsBox.innerHTML = '';

        data.results.forEach((item) => {
            const div = document.createElement('div');

            div.textContent = `${item.name} — корпус ${item.building}, этаж ${item.floor}`;

            div.onclick = () => {
                window.location.href =
                    `/building/${item.building}/?floor=${item.floor}&room=${item.name}`;
            };

            resultsBox.appendChild(div);
        });

    } catch (e) {
        console.error("Search error:", e);
    }
}

// =======================
// EXTRACT ROOM
// =======================
function extractRoomName(text) {
    if (!text) return null;
    return text.split(' ')[0].split('—')[0].trim();
}

// =======================
// ROUTE
// =======================
function runRoute() {
    const from = extractRoomName(input.value);
    const to = extractRoomName(secondInput.value);

    if (!from || !to) {
        alert("Введите обе аудитории");
        return;
    }

    clearPath();

    setTimeout(() => {
        if (window.runRouting) {
            window.runRouting(from, to);
        }
    }, 50);
}

// =======================
// UI SWITCH
// =======================
function enableRouteMode() {
    isRouteMode = true;

    secondInput.style.display = 'block';
    input.placeholder = "Откуда";

    searchButton.style.right = '12px';
    routeButton.style.right = '92px';
    if (clearButton) clearButton.style.right = '52px';
}

function disableRouteMode() {
    isRouteMode = false;

    secondInput.style.display = 'none';
    input.placeholder = "Поиск аудитории...";

    routeButton.style.right = '12px';
    searchButton.style.right = '52px';
    if (clearButton) clearButton.style.right = '92px';

    clearPath();
}

// =======================
// INIT
// =======================
document.addEventListener('DOMContentLoaded', () => {

    // SEARCH BUTTON
    searchButton?.addEventListener('click', () => {
        if (isRouteMode) {
            disableRouteMode();
        } else {
            performSearch(input.value);
        }
    });

    // ROUTE BUTTON
    routeButton?.addEventListener('click', () => {

        if (!isRouteMode) {
            enableRouteMode();
        } else {
            // повторное нажатие → строим маршрут
            clearPath();
            runRoute();
        }
    });

    // INPUT SEARCH
    input.addEventListener('input', (e) => {
        if (!isRouteMode) {
            performSearch(e.target.value);
        }
    });

    // CLEAR BUTTON
    clearButton?.addEventListener('click', () => {
        input.value = '';
        if (secondInput) secondInput.value = '';
        clearResults();
        clearPath();
    });
});