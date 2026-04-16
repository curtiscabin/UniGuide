// main/static/main/js/search.js

// === ИНИЦИАЛИЗАЦИЯ ===
const input = document.getElementById('searchInput');
const resultsBox = document.getElementById('searchResults');
const searchButton = document.getElementById('searchButton');
const clearButton = document.getElementById('clearButton');
let selectedIndex = -1;
let currentResults = [];

// === ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ ===
const clearResults = () => {
    resultsBox.innerHTML = '';
    currentResults = [];
    selectedIndex = -1;
};

const updateSelection = (results) => {
    results.forEach((result, index) => {
        if (index === selectedIndex) {
            result.style.background = '#3d3d3d';
            result.style.color = '#ffffff';
            result.scrollIntoView({ block: 'nearest' });
        } else {
            result.style.background = '';
            result.style.color = '#e0e0e0';
        }
    });
};

const navigateTo = (item) => {
    window.location.href = `/building/${item.building}/?floor=${item.floor}&room=${item.name}`;
};

const toggleClearButton = () => {
    if (clearButton) {
        if (input.value.trim()) {
            clearButton.style.opacity = '0.7';
            clearButton.style.pointerEvents = 'auto';
        } else {
            clearButton.style.opacity = '0';
            clearButton.style.pointerEvents = 'none';
        }
    }
};

// === ПОИСК ===
const performSearch = async (query) => {
    selectedIndex = -1;

    if (!query.trim()) {
        clearResults();
        toggleClearButton();
        return;
    }

    try {
        const response = await fetch(`/search/?q=${query}`);
        const data = await response.json();
        currentResults = data.results;

        resultsBox.innerHTML = '';

        data.results.forEach((item, index) => {
            const div = document.createElement('div');
            div.textContent = `${item.name} — корпус ${item.building}, этаж ${item.floor}`;
            div.setAttribute('data-index', index);

            div.onclick = () => {
                window.location.href = `/building/${item.building}/?floor=${item.floor}&room=${item.name}`;
            };

            div.addEventListener('mouseenter', () => {
                if (selectedIndex !== -1) {
                    const results = resultsBox.querySelectorAll('div');
                    results.forEach((res, i) => {
                        if (i === selectedIndex) {
                            res.style.background = '';
                            res.style.color = '#e0e0e0';
                        }
                    });
                    selectedIndex = -1;
                }
            });

            resultsBox.appendChild(div);
        });
        toggleClearButton();
    } catch (error) {
        console.error('Ошибка поиска:', error);
    }
};

// === НАВИГАЦИЯ ПО СТРЕЛКАМ ===
const handleKeyNavigation = (event) => {
    const results = resultsBox.querySelectorAll('div');
    if (results.length === 0) return;

    if (event.key === 'ArrowDown') {
        event.preventDefault();
        selectedIndex = Math.min(selectedIndex + 1, results.length - 1);
        updateSelection(results);
        if (selectedIndex >= 0) {
            input.value = results[selectedIndex].textContent;
        }
    }
    else if (event.key === 'ArrowUp') {
        event.preventDefault();
        selectedIndex = Math.max(selectedIndex - 1, -1);
        updateSelection(results);
        if (selectedIndex >= 0) {
            input.value = results[selectedIndex].textContent;
        }
    }
    else if (event.key === 'Enter') {
        event.preventDefault();
        if (selectedIndex >= 0 && results[selectedIndex]) {
            const item = currentResults[selectedIndex];
            if (item) navigateTo(item);
        }
        else if (results.length > 0) {
            const item = currentResults[0];
            if (item) navigateTo(item);
        }
    }
    else if (event.key === 'Escape') {
        clearResults();
        input.blur();
        toggleClearButton();
    }
};

// === ПОДСВЕТКА КОМНАТЫ ===
const highlightRoom = () => {
    const params = new URLSearchParams(window.location.search);
    const roomName = params.get('room');

    if (!roomName) return;

    setTimeout(() => {
        const roomElement = document.querySelector(`[data-name="${roomName}"]`);
        if (roomElement) {
            roomElement.classList.add('highlight');
            roomElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
            setTimeout(() => roomElement.classList.remove('highlight'), 3000);
        }
    }, 100);
};

// === ОБРАБОТЧИКИ СОБЫТИЙ ===
const init = () => {
    if (!input) return;

    input.addEventListener('input', (e) => performSearch(e.target.value));
    input.addEventListener('keydown', handleKeyNavigation);
    input.addEventListener('blur', () => setTimeout(clearResults, 200));
    input.addEventListener('click', () => {
        if (input.value.trim() && !resultsBox.innerHTML) {
            performSearch(input.value);
        }
    });

    document.addEventListener('click', (event) => {
        const searchBox = document.querySelector('.search-box');
        if (searchBox && !searchBox.contains(event.target)) {
            clearResults();
        }
    });

    if (resultsBox) {
        resultsBox.addEventListener('click', (event) => event.stopPropagation());
    }

    if (searchButton) {
        searchButton.addEventListener('click', () => {
            const results = resultsBox.querySelectorAll('div');
            if (selectedIndex >= 0 && results[selectedIndex]) {
                const item = currentResults[selectedIndex];
                if (item) navigateTo(item);
            }
            else if (results.length > 0) {
                const item = currentResults[0];
                if (item) navigateTo(item);
            }
            else if (input.value.trim()) {
                performSearch(input.value);
            }
        });
    }

    if (clearButton) {
        clearButton.addEventListener('click', () => {
            input.value = '';
            clearResults();
            input.focus();
            toggleClearButton();
        });
    }

    toggleClearButton();
    highlightRoom();
};

// Запуск после загрузки DOM
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}