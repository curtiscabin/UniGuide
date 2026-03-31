from django.shortcuts import render, get_object_or_404
from main.models import Building, Room
from django.http import JsonResponse

FLOOR_TEMPLATES = {
    1: {1: "buildings/floors/building_1_floor_1.html",
        2: "buildings/floors/building_1_floor_2.html",
        3: "buildings/floors/building_1_floor_3.html",
        4: "buildings/floors/building_1_floor_4.html",
        5: "buildings/floors/building_1_floor_5.html"},
    2: {1: "buildings/floors/building_2_floor_1.html",
        2: "buildings/floors/building_2_floor_2.html",
        3: "buildings/floors/building_2_floor_3.html",
        4: "buildings/floors/building_2_floor_4.html",
        5: "buildings/floors/building_2_floor_5.html",
        6: "buildings/floors/building_2_floor_6.html"},
    6: {1: "buildings/floors/building_6_floor_1.html",
        2: "buildings/floors/building_6_floor_2.html",
        3: "buildings/floors/building_6_floor_3.html",
        4: "buildings/floors/building_6_floor_4.html",
        5: "buildings/floors/building_6_floor_5.html"},
    # ... остальные корпуса
}

def index(request):
    """
    Главная страница со схемой корпусов университета

    Эта функция:
    1. Получает все корпуса из базы данных
    2. Передает их в HTML шаблон
    3. HTML шаблон отображает их на странице
    """

    # Получаем все корпуса, отсортированные по номеру
    buildings = Building.objects.all().order_by('number')

    # Подготавливаем данные для передачи в HTML шаблон
    context = {
        'buildings': buildings,  # Список всех корпусов
        'page_title': 'Карта кампуса - Корпуса университета'
    }

    # Рендерим шаблон и передаем контекст
    return render(request, 'index.html', context)

def building_detail(request, number):
    building = get_object_or_404(Building, number=number)

    floor = int(request.GET.get('floor', 1))  # 👈 вот это важно

    floors = list(range(1, building.floors_count + 1))
    floor_templates = FLOOR_TEMPLATES.get(building.number, {})

    current_template = floor_templates.get(floor)

    context = {
        'building': building,
        'floors': floors,
        'current_floor': floor,
        'current_template': current_template,
    }

    return render(request, 'building.html', context)

def search(request):
    query = request.GET.get('q', '').strip()

    results = []

    if query:
        rooms = Room.objects.filter(name__icontains=query)[:10]

        for room in rooms:
            results.append({
                'name': room.name,
                'building': room.building.number,
                'floor': room.floor,
                'type': room.type
            })

    return JsonResponse({'results': results})