# Generated by Django 4.2.1 on 2023-09-14 21:17

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('mainapp', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Promo',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('promo', models.CharField(max_length=30)),
                ('archived', models.BooleanField(default=False)),
            ],
        ),
    ]