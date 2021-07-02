// checking local storage
let cart;
if(localStorage.getItem('cart') == null){
    cart = {};
}
else{
    // if found then parse it to python dict 
    // and change the text in the cartCount
    cart = JSON.parse(localStorage.getItem('cart'));
    document.getElementById('cartCount').innerHTML = Object.keys(cart).length;
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
    document.getElementById('cartCount').innerHTML = Object.keys(cart).length;
})

// intialize the cart-popover

let popCart = document.getElementById('popcart')
let popOverCart = new bootstrap.Popover(popCart, {
    trigger: 'focus'
})