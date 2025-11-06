from django.db import models


class Building(models.Model):
    """Модель для хранения информации о корпусах университета"""

    # Номер корпуса (уникальный)
    number = models.IntegerField(unique=True, verbose_name="Номер корпуса", blank = False)

    # CSS позиционирование - это определяет ГДЕ на экране будет корпус
    position_left = models.CharField(
        max_length=20,
        verbose_name="Позиция слева",
        help_text="Отступ от левого края"
    )
    position_top = models.CharField(
        max_length=20,
        verbose_name="Позиция сверху",
        help_text="Отступ от верхнего края"
    )

    # Размеры - это определяет РАЗМЕР корпуса на экране
    width = models.CharField(
        max_length=20,
        verbose_name="Ширина",
        help_text="Ширина корпуса"
    )
    height = models.CharField(
        max_length=20,
        verbose_name="Высота",
        help_text="Высота корпуса"
    )

    # Форма корпуса - это определяет ОЧЕРТАНИЯ (может быть сложная форма)
    clip_path = models.TextField(
        blank=True,
        verbose_name="Форма корпуса",
        help_text="CSS polygon для сложных форм (оставьте пусто если обычный прямоугольник)"
    )

    #Скругление корпусов
    border_radius = models.CharField(
        max_length=50,
        blank=True,  # Поле не обязательное
        verbose_name="Скругление углов (border-radius)",
        help_text="Например: 10px или 10px 0 10px 0"
    )

    #Отступы для текста
    text_padding_top = models.CharField(
        max_length=20,
        blank=True,
        verbose_name="Отступ текста сверху",
        help_text="Например: 10px или 2em"
    )

    text_padding_left = models.CharField(
        max_length=20,
        blank=True,
        verbose_name="Отступ текста слева",
        help_text="Например: 15px"
    )

    class Meta:
        verbose_name = "Корпус"
        verbose_name_plural = "Корпуса"
        ordering = ['number']

    def __str__(self):
        return f"Корпус {self.number}"


