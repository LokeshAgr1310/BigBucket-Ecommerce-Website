from django.db import models

# Create your models here.
class Product(models.Model):

    # TODO: creating fulldesc and short desc
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


class Contact(models.Model):
    name = models.CharField(max_length=50)
    email = models.CharField(max_length=70)
    phone = models.IntegerField()
    desc = models.TextField(max_length=700)
    pub_date = models.DateTimeField()

    def __str__(self):
        return self.name

class Order(models.Model):
    itemsJson = models.CharField(max_length=100000)
    customerName = models.CharField(max_length=100)
    customerEmail = models.CharField(max_length=200)
    customerPhone = models.IntegerField()
    customerAddress = models.CharField(max_length=400)
    customerCity = models.CharField(max_length=100)
    customerState = models.CharField(max_length=100)
    customerZipCode = models.CharField(max_length=10)
    orderDate = models.DateTimeField()

    def __str__(self):
        return self.customerName

class OrderUpdate(models.Model):
    order_id = models.IntegerField(default="")
    orderUpdateDesc = models.CharField(max_length=5000, default="")
    updateTimeStamp = models.DateTimeField() 

    def __str__(self):
        return self.orderUpdateDesc[:10] + "..."