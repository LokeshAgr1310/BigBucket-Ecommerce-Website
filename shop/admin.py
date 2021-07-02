from django.contrib import admin
from .models import Product, Contact

# Register your models here.
class ProductAdmin(admin.ModelAdmin):
    list_display = ('product_no','product_name', 'product_desc', 'pub_date')
    list_filter = ['pub_date']

class ContactAdmin(admin.ModelAdmin):
    list_display = ('name', 'email', 'phone')
    list_filter = ['pub_date']

admin.site.register(Product, ProductAdmin)
admin.site.register(Contact, ContactAdmin)
