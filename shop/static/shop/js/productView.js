// initialize some global variable
let cart;
let count = 0;

// some useful function which is used globally..
// function to get the count the quantity of product that is in cart
function getCartCount(cart){
    Object.keys(cart).forEach(function(key){
        count += cart[key][0];
    });
    return count;
};

// checking local storage
if(localStorage.getItem('cart') == null){
    cart = {};
}
else{
    // if found then parse it to python dict 
    // and change the text in the cartCount
    cart = JSON.parse(localStorage.getItem('cart'));
    count = 0;
    document.getElementById('cartCount').innerHTML = getCartCount(cart);
}
$('.cart').click(function(){
    // taking id of the clicked item
    let idStr = this.id.toString();

    // if cart dict contain the given id then increment by 1
    // else initialize to 1.
    if(cart[idStr]){
        cart[idStr] = cart[idStr] + 1;
    }
    else{
        cart[idStr] = 1;
    }

    // save the cart in the localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
    count = 0;
    document.getElementById('cartCount').innerHTML = getCartCount(count);
})

// intialize the cart-popover

let popCart = document.getElementById('popcart')
let popOverCart = new bootstrap.Popover(popCart, {
    trigger: 'focus'
})