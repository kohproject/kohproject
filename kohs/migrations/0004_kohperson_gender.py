# Generated by Django 4.0.3 on 2022-04-12 01:06

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('kohs', '0003_remove_kohperson_gender'),
    ]

    operations = [
        migrations.AddField(
            model_name='kohperson',
            name='gender',
            field=models.IntegerField(choices=[(1, 'Male'), (2, 'Female'), (3, 'Other')], default=1),
        ),
    ]