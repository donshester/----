from django.core.validators import MinValueValidator, MaxValueValidator
from django.db import models

from products.models import Product


class Review(models.Model):
    reviewer = models.CharField(max_length=30, blank=False, default='guest')
    review = models.CharField(max_length=2000, blank=True)
    date = models.DateField(auto_now=True, blank=True)
    time = models.TimeField(auto_now=True, blank=True)
    rating = models.IntegerField(validators=[MinValueValidator(0), MaxValueValidator(5)], blank=False)
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='reviews', null=True)


class Promo(models.Model):
    promo = models.CharField(max_length=30, blank=False)
    percentage = models.DecimalField(max_digits=5, decimal_places=2, default=0.00)
    archived = models.BooleanField(default=False)
    description = models.CharField(default='', max_length=255, blank=False)


class News(models.Model):
    title = models.CharField(max_length=200)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    path = models.CharField(max_length=500, default='')
    def __str__(self):
        return self.title

