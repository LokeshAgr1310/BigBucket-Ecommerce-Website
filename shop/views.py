from django.shortcuts import render, redirect
from .models import Product, Contact
from django.utils import timezone
from django.urls import reverse

# Create your views here.

def IndexView(request):
    allProducts = []

    # making dict of category and id
    category_wise_products = Product.objects.values('category', 'id')

    # creating list of categories
    list_of_categories = list({item['category'] for item in category_wise_products})

    for category in list_of_categories:
        # fetching products with category in list_of_categories
        product = Product.objects.filter(category=category)
        no_of_product = (product.count()//3)*3

        # slicing the product list
        newProducts = product[:no_of_product]

        # use in the making slider in carousel
        range_slides = range(0, product.count()//3)
        allProducts.append([newProducts, no_of_product, range_slides, category])

    context = {
        "products": allProducts,
    }
    return render(request, 'shop/index.html', context)

def AboutView(request):
    return render(request, 'shop/about.html')

def ContactView(request):

    if request.method == "POST":
        name = request.POST.get('name', '')
        email = request.POST.get('email', '')
        phone = request.POST.get('phone', None)
        desc = request.POST.get('desc', '')
        contactTime = timezone.now()
        contactDetails = Contact(name=name, email=email, phone=phone, desc=desc, pub_date=contactTime)
        contactDetails.save()
        return redirect(reverse('shop:ContactUs'))

    return render(request, 'shop/contact.html')

def TrackerView(request):
    return render(request, 'shop/ordertracker.html')

def SearchView(request):
    return render(request, 'shop/search.html')

def ProductView(request, prodId):
    product = Product.objects.get(id=prodId)
    context = {"product": product}
    return render(request, 'shop/productView.html', context)

def CheckoutView(request):
    return render(request, 'shop/ordercheckout.html')

