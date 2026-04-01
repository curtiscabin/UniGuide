from bs4 import BeautifulSoup
from main.models import Room, Building
import os


def run(floor):
    building = Building.objects.get(number=6)

    path = os.path.join(
        "main",
        "templates",
        "buildings",
        "floors",
        f"building_6_floor_{floor}.html"
    )

    with open(path, encoding='utf-8') as f:
        soup = BeautifulSoup(f, 'html.parser')

    # берем только элементы с data-type (это уже фильтр)
    elements = soup.find_all('div', attrs={'data-type': True, 'data-name': True})

    for el in elements:
        name = el.get('data-name')
        rtype = el.get('data-type')

        # дополнительная защита (на всякий случай)
        if not name or not rtype:
            continue

        room, created = Room.objects.get_or_create(
            name=name,
            building=building,
            floor=floor,
            defaults={'type': rtype}
        )

        if created:
            print(f"Добавлено: {name} ({rtype})")
        else:
            print(f"Уже есть: {name}")

    print("Готово")