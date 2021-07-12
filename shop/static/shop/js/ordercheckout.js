let totalQty = 0;
let totalPrice = 0;
// cart is not present in the localStorage then create a cart dict
if(localStorage.getItem('cart') == null){
    var cart = {};
}
else{
    // it present then parse it to dict 
    cart =  JSON.parse(localStorage.getItem('cart'));
}

// selecting the ul which contain the list of product 
// added to cart
let ulItem = $('#items');
let myStr = "";
let newStr = "";

// if cart is not empty then show the 
// product Name and qty
if(Object.keys(cart).length != 0){
    for(key in cart){
        let productName = cart[key][1];
        let qty = cart[key][0];
        let productPrice = cart[key][2];
        totalPrice += productPrice*qty;
        totalQty += qty;
        myStr = `<li class="list-group-item d-flex justify-content-between align-items-center">
            ${productName}
            <div class="d-inline-block" >
                <span class="text-secondary">Price: </span>
                <sup><i class='bx bx-rupee price-color fs-6' style="color: #B12704;"></i></sup>
                <span class="price-color fw-bolder fs-4 me-2" style="color: #B12704;">${productPrice}</span>
                <span class="text-secondary">Qty: </span>
                <span class="badge rounded-pill bg-primary">${qty}</span>
            </div>
        </li>`
        ulItem.append(myStr);
    }
    newStr = `<p style="float: right; border-bottom: 1px solid rgba(0,0,0,.125);"><span class="text-secondary">TotalPrice: </span>
    <sup><i class='bx bx-rupee price-color fs-6' style="color: #B12704;"></i></sup>
    <span class="price-color fw-bolder fs-4 me-2" style="color: #B12704;">${totalPrice}</span></p>`
    ulItem.after(newStr);
}

// else show the desired message
else{
    myStr = "<p>Your Cart is empty, Please add some items to your cart...</p>"
    ulItem.append(myStr);
}

// count the number of products in cart
document.getElementById('cartCount').innerHTML = totalQty;


// passing the cart in the Order Model
$('#itemsJson').attr('value', JSON.stringify(cart))
// if(ordered){
//     alert('You order has been successfully placed...')
//     localStorage.clear();
//     document.location = '/shop';
// }
