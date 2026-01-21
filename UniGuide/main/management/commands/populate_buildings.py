from django.core.management.base import BaseCommand
from main.models import Building


class Command(BaseCommand):
    """
    Management команда для заполнения БД корпусами

    Запуск: python manage.py populate_buildings
    """

    help = 'Заполняет базу данных 9 корпусами университета'

    def handle(self, *args, **kwargs):
        # Данные всех 9 корпусов (координаты взяты из HTML)
        buildings_data = [
            {
                'number': 1,
                'position_left': '42%',
                'position_top': '54%',
                'width': '420px',
                'height': '180px',
                'clip_path': 'polygon(0 0, 100% 0, 100% 100%, 85% 100%, 85% 35%, 15% 35%, 15% 100%, 0 100%)',
                'text_padding_top': '20px',
                'text_padding_left': '200px',
                'floors_count' : 5,
            },
            {
                'number': 2,
                'position_left': '21.3%',
                'position_top': '24%',
                'width': '250px',
                'height': '388px',
                'clip_path': 'polygon(0 0, 78% 0, 78% 15%, 0 15%, 0 30%, 78% 30%, 78% 42%, 45% 42%, 45% 65%, 73% 65%, 73% 75%, 68% 75%, 68% 95%, 76% 95%, 76% 100%, 100% 100%, 100% 0)',
                'text_padding_top': '80px',
                'text_padding_left': '120px',
                'floors_count': 6,
            },
            {
                'number': 3,
                'position_left': '2%',
                'position_top': '14%',
                'width': '340px',
                'height': '460px',
                'clip_path': 'polygon(0 0, 15% 0, 15% 45%, 45% 45%, 45% 0, 60% 0, 60% 60%, 15% 60%, 15% 85%, 100% 85%, 100% 100%, 0 100%)',
                'text_padding_top': '230px',
                'text_padding_left': '90px',
                'floors_count': 4,
            },
            {
                'number': 4,
                'position_left': '2%',
                'position_top': '5%',
                'width': '204px',
                'height': '63px',
                'clip_path': '',
                'border_radius': '50px 0 0 0',
                'text_padding_top': '30px',
                'text_padding_left': '120px',
                'floors_count': 4,
            },
            {
                'number': 5,
                'position_left': '16.5%',
                'position_top': '5%',
                'width': '231px',
                'height': '63px',
                'clip_path': '',
                'text_padding_top': '30px',
                'text_padding_left': '120px',
                'floors_count': 4,
            },
            {
                'number': 6,
                'position_left': '36.1%',
                'position_top': '5%',
                'width': '273px',
                'height': '136px',
                'clip_path': 'polygon(0 0, 100% 0, 100% 100%, 70% 100%, 70% 50%, 20% 50%, 20% 100%, 0 100%)',
                'text_padding_top': '30px',
                'text_padding_left': '120px',
                'floors_count': 5,
            },
            {
                'number': 7,
                'position_left': '62%',
                'position_top': '5%',
                'width': '424px',
                'height': '136px',
                'clip_path': 'polygon(0 0, 90% 0, 90% 50%, 23% 50%, 23% 100%, 0 100%)',
                'text_padding_top': '30px',
                'text_padding_left': '120px',
                'floors_count': 4,
            },
            {
                'number': 8,
                'position_left': '77%',
                'position_top': '5%',
                'width': '220px',
                'height': '450px',
                'clip_path': 'polygon(0 0, 78% 0, 78% 40%, 30% 40%, 30% 15%, 0 15%, 0 75%, 30% 75%, 30% 60%, 78% 60%, 78% 95%, 100% 95%, 100% 0)',
                'text_padding_top': '215px',
                'text_padding_left': '100px',
                'floors_count': 4,
            },
            {
                'number': 9,
                'position_left': '77%',
                'position_top': '62%',
                'width': '220px',
                'height': '170px',
                'clip_path': 'polygon(0 0, 100% 0, 100% 100%, 30% 100%, 30% 85%, 0 85%)',
                'border_radius': '0 0 40px 0',
                'text_padding_top': '80px',
                'text_padding_left': '100px',
                'floors_count': 6,
            },
        ]

        self.stdout.write(self.style.WARNING('Начинаем заполнение базы данных...'))

        # Проходим по каждому корпусу
        for data in buildings_data:
            # Создаем или обновляем корпус
            building, created = Building.objects.update_or_create(
                number=data['number'],
                defaults=data
            )

            # Выводим результат
            if created:
                status = self.style.SUCCESS('✓ СОЗДАН')
            else:
                status = self.style.WARNING('✓ ОБНОВЛЕН')

            self.stdout.write(
                f'{status} Корпус {building.number} → '
                f'позиция ({data["position_left"]}, {data["position_top"]}) → '
                f'размер {data["width"]}x{data["height"]}'
            )

        # Финальное сообщение
        self.stdout.write(
            self.style.SUCCESS(
                '\n✓✓✓ Готово! Все 9 корпусов успешно загружены в базу данных! ✓✓✓'
            )
        )
