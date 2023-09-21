from django.contrib import admin

from mainapp.models import Review, Promo, News


# Register your models here.
@admin.register(Review)
class ReviewAdmin(admin.ModelAdmin):
    list_display = ('reviewer', 'date', 'time', 'rating')
    list_filter = ('date', 'time', 'rating')


@admin.register(Promo)
class PromoAdmin(admin.ModelAdmin):
    list_display = ('promo', 'archived', 'description')
    list_filter = ('promo', 'archived', 'description')

@admin.register(News)
class PromoAdmin(admin.ModelAdmin):
    list_display = ('title', 'created_at', 'path', 'content')

