from django.urls import path
from . import views
app_name = 'shop'

urlpatterns = [
    path('', views.IndexView, name="ShopHome"),
    path('about/', views.AboutView, name="AboutUs"),
    path('contact/', views.ContactView, name="ContactUs"),
    path('tracker/', views.TrackerView, name="TrackingStatus"),
    path('search/', views.SearchView, name="Search"),
    path('productView/<int:prodId>', views.ProductView, name="ProductView"),
    path('checkout/', views.CheckoutView, name="Checkout"),
]