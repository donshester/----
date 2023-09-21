from django import forms
from django.core.validators import MinValueValidator, MaxValueValidator

from .models import Product
from mainapp.models import Review


class ProductForm(forms.ModelForm):
    price = forms.DecimalField(min_value=0)
    quantity = forms.IntegerField(min_value=0)

    def clean_name(self):
        name = self.cleaned_data.get('name')
        if not any(char.isalpha() for char in name):
            raise forms.ValidationError("Name must contain at least one letter.")
        return name
    class Meta:
        model = Product
        fields = ['name', 'price', 'unit', 'manufacturer', 'category', 'quantity']

class ReviewForm(forms.ModelForm):
    rating = forms.IntegerField(
        validators=[
            MinValueValidator(0, "Rating must be 0 or greater."),
            MaxValueValidator(5, "Rating must be 5 or less.")
        ]
    )

    class Meta:
        model = Review
        fields = ['reviewer', 'review', 'rating']