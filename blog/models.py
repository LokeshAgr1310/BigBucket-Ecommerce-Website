from django.db import models

# Create your models here.
class BlogPost(models.Model):
    blogTitle = models.CharField(max_length=100, default="")
    heading = models.CharField(max_length=500, default="")
    headingContent = models.CharField(max_length=5000, default="")
    subHeading0 = models.CharField(max_length=500, default="")
    subHeading0Content = models.CharField(max_length=5000, default="")
    subHeading1 = models.CharField(max_length=500, default="")
    subHeading1Content = models.CharField(max_length=5000, default="")
    postDate = models.DateField()
    postThumbnail = models.ImageField(upload_to='blog/img', default="")

    def __str__(self):
        return self.blogTitle