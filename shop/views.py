from django.shortcuts import render
from django.http import HttpResponse
from .models import Product

# Create your views here.

def IndexView(request):
    # no_of_products = Product.objects.count()
    # noOfSlide = range(0, no_of_products//3)
    # products = Product.objects.all()[:(no_of_products//3)*3]
    # context = {
    #     "products": products,
    #     "slides": noOfSlide,
    #     "noOfCard": range(0, 3),
    # }


    allProducts = []
    category_wise_products = Product.objects.values('category', 'id')
    list_of_categories = list({item['category'] for item in category_wise_products})

    for category in list_of_categories:
        product = Product.objects.filter(category=category)
        no_of_product = (product.count()//3)*3
        newProducts = product[:no_of_product]
        range_slides = range(0, product.count()//3)
        allProducts.append([newProducts, no_of_product, range_slides, category])

    context = {
        "products": allProducts,
    }
    return render(request, 'shop/index.html', context)

def AboutView(request):
    return render(request, 'shop/about.html')

def ContactView(request):
    return render(request, 'shop/contact.html')

def TrackerView(request):
    return render(request, 'shop/ordertracker.html')

def SearchView(request):
    return render(request, 'shop/search.html')

def ProductView(request):
    return render(request, 'shop/productView.html')

def CheckoutView(request):
    return render(request, 'shop/ordercheckout.html')

