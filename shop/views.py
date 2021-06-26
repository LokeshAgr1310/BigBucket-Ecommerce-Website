from django.shortcuts import render
from django.http import HttpResponse

# Create your views here.

def IndexView(request):
    return render(request, 'shop/index.html')

def AboutView(request):
    return HttpResponse("I am at About Page...")

def ContactView(request):
    return HttpResponse("I am at Contact Page...")

def TrackerView(request):
    return HttpResponse("I am at Tracker Page...")

def SearchView(request):
    return HttpResponse("I am at search Page...")

def ProductView(request):
    return HttpResponse("I am at Product details Page...")

def CheckoutView(request):
    return HttpResponse("I am at Product checkout Page...")

