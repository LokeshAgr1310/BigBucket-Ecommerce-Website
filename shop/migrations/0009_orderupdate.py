# Generated by Django 3.2.4 on 2021-07-11 10:14

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('shop', '0008_order'),
    ]

    operations = [
        migrations.CreateModel(
            name='OrderUpdate',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('order_id', models.IntegerField(default='')),
                ('orderUpdateDesc', models.CharField(default='', max_length=5000)),
                ('updateTimeStamp', models.DateTimeField(auto_now_add=True)),
            ],
        ),
    ]
