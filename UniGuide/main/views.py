from django.shortcuts import render
from main.models import Building


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

