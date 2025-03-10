# Generated by Django 4.2.6 on 2024-12-02 18:21

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Restaurant',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('description', models.TextField(blank=True, null=True)),
                ('rating', models.FloatField(default=0.0)),
                ('address', models.CharField(max_length=255)),
                ('prices', models.CharField(max_length=50)),
                ('cuisine_type', models.JSONField()),
                ('photo_links', models.CharField(max_length=255)),
            ],
        ),
    ]
