# Generated by Django 3.2.4 on 2021-07-02 14:39

import datetime
from django.db import migrations, models
from django.utils.timezone import utc


class Migration(migrations.Migration):

    dependencies = [
        ('shop', '0006_alter_contact_phone'),
    ]

    operations = [
        migrations.AddField(
            model_name='contact',
            name='pub_date',
            field=models.DateTimeField(default=datetime.datetime(2021, 7, 2, 14, 39, 35, 889989, tzinfo=utc)),
            preserve_default=False,
        ),
    ]