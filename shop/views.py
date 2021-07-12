from django.shortcuts import render, redirect
from .models import Product, Contact, Order, OrderUpdate
from django.utils import timezone
from django.urls import reverse
from django.contrib import messages
import json
from django.http import HttpResponse

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
        'ordered': False,
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
        messages.add_message(request, messages.SUCCESS, 'Your Query has been Submitted. Response within 2-3days.')
        return redirect(reverse('shop:ContactUs'))

    return render(request, 'shop/contact.html')



def TrackerView(request):
    if request.method == 'POST':
        orderId = request.POST.get('orderId')
        email = request.POST.get('email')
        try:
            orders = Order.objects.filter(id=orderId, customerEmail=email)
            if len(orders)>0 :
                orderUpdate = OrderUpdate.objects.filter(order_id=orderId)
                orderUpdates = []
                for order in orderUpdate:
                    orderUpdates.append({'desc': order.orderUpdateDesc, 'updateDate': order.updateTimeStamp})
                response = json.dumps([orderUpdates, orders[0].itemsJson], default=str)
                return HttpResponse(response)
            else:
                return HttpResponse('{}')
        except Exception as E:
            return HttpResponse('{}')
    return render(request, 'shop/ordertracker.html')



def SearchView(request):
    return render(request, 'shop/search.html')



def ProductView(request, prodId):
    product = Product.objects.get(id=prodId)
    context = {"product": product}
    return render(request, 'shop/productView.html', context)



def CheckoutView(request):

    if request.method == "POST":
        itemsJson = request.POST.get('itemsJson', 'Something went wrong')
        name = request.POST.get('inputName', '')
        email = request.POST.get('inputEmail', '')
        phone = request.POST.get('inputPhone', '')
        address = f"{request.POST.get('inputAddress', '')} {request.POST.get('inputAddressLine', '')}"
        state = request.POST.get('inputState', '')
        zip_code = request.POST.get('inputZip', '')
        city = request.POST.get('inputCity', '')
        orderDate = timezone.now()

        order = Order(itemsJson=itemsJson, customerName=name, customerEmail=email, customerPhone=phone, customerAddress=address, customerCity=city, customerState=state, customerZipCode=zip_code, orderDate=orderDate)
        order.save()
        updateDate = timezone.now()
        orderUpdates = OrderUpdate(order_id=order.id, orderUpdateDesc="The order has been successfully placed...", updateTimeStamp=updateDate)
        orderUpdates.save()
        return render(request, 'shop/ordercheckout.html', {'ordered': True})

    return render(request, 'shop/ordercheckout.html')

