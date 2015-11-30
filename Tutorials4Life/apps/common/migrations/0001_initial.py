# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models
from django.conf import settings
import tinymce.models


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Category',
            fields=[
                ('id', models.AutoField(serialize=False, primary_key=True, auto_created=True, verbose_name='ID')),
                ('title', models.CharField(unique=True, max_length=255, verbose_name='Category name')),
            ],
            options={
                'verbose_name_plural': 'Categories',
                'verbose_name': 'Category',
                'ordering': ['title'],
            },
        ),
        migrations.CreateModel(
            name='Section',
            fields=[
                ('id', models.AutoField(serialize=False, primary_key=True, auto_created=True, verbose_name='ID')),
                ('title', models.CharField(max_length=255, verbose_name='Section title')),
                ('content', tinymce.models.HTMLField(help_text='Section content help', verbose_name='Section content')),
                ('order', models.IntegerField(verbose_name='Section order')),
            ],
            options={
                'verbose_name_plural': 'Sections',
                'verbose_name': 'Section',
                'ordering': ['order'],
            },
        ),
        migrations.CreateModel(
            name='Tutorial',
            fields=[
                ('id', models.AutoField(serialize=False, primary_key=True, auto_created=True, verbose_name='ID')),
                ('title', models.CharField(unique=True, max_length=255, verbose_name='Tutorial title')),
                ('publish_date', models.DateTimeField(null=True)),
                ('author', models.ForeignKey(to=settings.AUTH_USER_MODEL)),
                ('category', models.ForeignKey(to='common.Category')),
            ],
            options={
                'verbose_name_plural': 'Tutorials',
                'verbose_name': 'Tutorial',
                'ordering': ['publish_date'],
            },
        ),
        migrations.AddField(
            model_name='section',
            name='tutorial',
            field=models.ForeignKey(to='common.Tutorial'),
        ),
    ]
