# Generated by Django 4.0.3 on 2022-09-04 17:15

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('kohs', '0005_kohperson_fbook_kohperson_insta_kohperson_notes_and_more'),
    ]

    operations = [
        migrations.CreateModel(
            name='PassUser',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('passwd', models.CharField(max_length=40)),
            ],
        ),
    ]
