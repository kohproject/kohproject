# Generated by Django 4.0.3 on 2022-04-12 00:49

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('kohs', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='profession',
            old_name='name',
            new_name='profession',
        ),
        migrations.AlterField(
            model_name='ethnic',
            name='country',
            field=models.CharField(max_length=100),
        ),
        migrations.AlterField(
            model_name='nation',
            name='country',
            field=models.CharField(max_length=100),
        ),
        migrations.CreateModel(
            name='kohPerson',
            fields=[
                ('name', models.CharField(max_length=255)),
                ('url', models.CharField(max_length=255, primary_key=True, serialize=False)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('modified_at', models.DateTimeField(auto_now=True)),
                ('ethnic', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='kohs.ethnic')),
                ('gender', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='kohs.gender')),
                ('nation', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='kohs.nation')),
                ('profession', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='kohs.profession')),
            ],
        ),
    ]