let total = 0;
if(localStorage.getItem('cart') == null){
    var cart = {};
    console.log(cart);
}
else{
    cart =  JSON.parse(localStorage.getItem('cart'));
}

let ulItem = $('#items');
let myStr = "";
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
else{
    console.log("not working!!!")
    myStr = "<p>Your Cart is empty, Please add some items to your cart...</p>"
    ulItem.append(myStr);
}

document.getElementById('cartCount').innerHTML = total;


/* <li class="list-group-item d-flex justify-content-between align-items-center">
Cras justo odio
<span class="badge rounded-pill bg-primary">14</span>
</li> */