from django.shortcuts import render
from .models import BlogPost
# Create your views here.

def index(request):
    blogPosts = BlogPost.objects.all()
    context = {'blogposts': blogPosts}
    return render(request, 'blog/index.html', context)

def blogPost(request, id):
    post = BlogPost.objects.get(id=id)
    context = {}
    
    # for next Blog
    try:
        nextBlog = list(BlogPost.objects.filter(id=post.id + 1))
        context['nextBlog'] = nextBlog
    except:
        context['nextBlog'] = []
    
    # for previous Blog
    try:
        prevBlog = list(BlogPost.objects.filter(id=post.id - 1))
        context['prevBlog'] = prevBlog
    except:
        context['prevBlog'] = []
    context['post'] = post
    return render(request, 'blog/blogPost.html', context)

