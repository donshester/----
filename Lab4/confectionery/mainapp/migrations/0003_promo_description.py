# Generated by Django 4.2.1 on 2023-09-14 21:23

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('mainapp', '0002_promo'),
    ]

    operations = [
        migrations.AddField(
            model_name='promo',
            name='description',
            field=models.CharField(default='', max_length=255),
        ),
    ]
