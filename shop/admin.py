from django.contrib import admin
from .models import Product

# Register your models here.
class ProductAdmin(admin.ModelAdmin):
    list_display = ('product_name', 'product_desc', 'pub_date')
    list_filter = ['pub_date']

admin.site.register(Product, ProductAdmin)
