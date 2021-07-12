from django.shortcuts import render

def index(request):
    params = {}
    return render(request, 'home.html')