from django.db import models

# Create your models here.
class Product(models.Model):
    product_no = models.IntegerField(default=1)
    product_name = models.CharField(max_length=50)
    category = models.CharField(max_length=50, default="")
    sub_category = models.CharField(max_length=50, default="")
    product_desc = models.CharField(max_length=300)
    price = models.IntegerField(default=0)
    pub_date = models.DateTimeField()
    product_image = models.ImageField(upload_to="shop/img", default="")

    def __str__(self):
        return self.product_name
