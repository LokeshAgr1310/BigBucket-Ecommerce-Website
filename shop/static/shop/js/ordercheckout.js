let total = 0;
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

// if cart is not empty then show the 
// product Name and qty
if(Object.keys(cart).length != 0){
    for(key in cart){
        let productName = cart[key][1];
        let qty = cart[key][0]
        total += qty;
        myStr = `<li class="list-group-item d-flex justify-content-between align-items-center">
        ${productName}
        <span class="badge rounded-pill bg-primary">${qty}</span>
        </li>`
        ulItem.append(myStr);
    }
}

// else show the desired message
else{
    console.log("not working!!!")
    myStr = "<p>Your Cart is empty, Please add some items to your cart...</p>"
    ulItem.append(myStr);
}

// count the number of products in cart
document.getElementById('cartCount').innerHTML = total;
