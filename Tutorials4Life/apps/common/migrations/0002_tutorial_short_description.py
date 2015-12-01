# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('common', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='tutorial',
            name='short_description',
            field=models.CharField(max_length=255, default=''),
            preserve_default=False,
        ),
    ]
