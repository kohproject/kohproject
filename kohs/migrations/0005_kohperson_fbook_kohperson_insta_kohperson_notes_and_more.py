# Generated by Django 4.0.3 on 2022-05-18 17:06

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('kohs', '0004_kohperson_gender'),
    ]

    operations = [
        migrations.AddField(
            model_name='kohperson',
            name='fbook',
            field=models.CharField(editable=False, max_length=255, null=True),
        ),
        migrations.AddField(
            model_name='kohperson',
            name='insta',
            field=models.CharField(editable=False, max_length=255, null=True),
        ),
        migrations.AddField(
            model_name='kohperson',
            name='notes',
            field=models.CharField(editable=False, max_length=255, null=True),
        ),
        migrations.AddField(
            model_name='kohperson',
            name='twitt',
            field=models.CharField(editable=False, max_length=255, null=True),
        ),
    ]
