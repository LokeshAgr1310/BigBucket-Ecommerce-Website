from django.db import models

# Create your models here.
class Product(models.Model):
    product_name = models.CharField(max_length=50)
    product_desc = models.CharField(max_length=300)
    pub_date = models.DateTimeField()

    def __str__(self):
        return self.product_name
