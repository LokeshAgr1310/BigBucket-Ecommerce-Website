from django.contrib import admin
from .models import BlogPost

# Register your models here.
class BlogPostAdmin(admin.ModelAdmin):
    list_display = ('blogTitle','heading', 'postDate')
    list_filter = ['postDate']

admin.site.register(BlogPost, BlogPostAdmin)
