
// checking local storage
let cart;

// initialize some useful variable
let count = 0;

// useful function
function getCartCount(cart){
    Object.keys(cart).forEach(function(key){
        count += cart[key];
    });
    return count;
};

if(localStorage.getItem('cart') == null){
    cart = {};
}
else{
    // if found then parse it to js dict 
    // and change the text in the cartCount
    cart = JSON.parse(localStorage.getItem('cart'));
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
    document.getElementById('cartCount').innerHTML = getCartCount(cart);
})

// intialize the cart-popover

let popCart = document.getElementById('popcart')
let popOverCart = new bootstrap.Popover(popCart, {
    trigger: 'focus'
})

