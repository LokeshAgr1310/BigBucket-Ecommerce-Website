// initialize some useful variable which is used in the script
let cart;
let count = 0;

// useful function which is used globally is declared here

// function to get the count the quantity of product that is in cart
function getCartCount(cart){
    Object.keys(cart).forEach(function(key){
        count += cart[key][0];
    });
    return count;
};

// intialize the cart-popover
var popCart = document.getElementById('popcart')
var popOverCart = new bootstrap.Popover(popCart)
var myDefaultAllowList = bootstrap.Tooltip.Default.allowList
myDefaultAllowList.button = ['onclick']


// it will update popover cart when we update the quantity of any product
function updatePopOverCart(cart)
{
    popStr = ""
    i = 1;
    if (cart){
        for(var item in cart){
            if(cart[item][0] != 0){
    
                // taking the product Name
                productName = document.getElementById(`productName${item}`).innerHTML;
                popStr = popStr + '<div class="row mx-1 border-bottom my-2">'
                popStr = popStr + '<div class="col-8 border-start">'
                popStr = popStr + `${i}. ${productName}</div>`
                popStr = popStr + '<div class="col-4">' + `Qty: ${cart[item][0]}</div>`
                popStr = popStr + '</div>'
                i++; 
            }
        }
    }
    popStr = popStr + `<a href='/shop/checkout/' class='btn btn-primary mx-2' id='checkout'>Checkout</a><button class='btn btn-primary' id='clearCart' onClick='clearCart()'>Clear Cart</button>`;
            
    // setting the popover-body content
    document.getElementById('popcart').setAttribute('data-bs-content', popStr);
    popOverCart.show()
    
}

function clearCart(){
    // TODO: Clear the = - button and add to cart button without refresh
    cart = JSON.parse(localStorage.getItem('cart'))
    for (key in cart){
        $(`#prodQuant${key}`).innerText = `<button id='${key}' class="btn btn-primary cart">Add to Cart</button>`
    };
    localStorage.clear();
    cart = {};
    count = 0;
    document.getElementById('cartCount').innerHTML = getCartCount(cart);
    updatePopOverCart(cart);
    location.reload();
}

// when someone clicked the "Add to Cart" button
// it will update the button to change the quantity of the product
function updateCart(cart, key){
    // checking the respective key have null or not
    // if null or 0 then productQuantity will be zero
    if(cart[key][0]){
        productQuantity = cart[key][0];
    }
    else{
        productQuantity = 0;
    }

    // changing the HTML of the "Add To cart" button
    document.getElementById(`prodQuant${key}`).innerHTML = `<button class="btn btn-primary minus mx-2" id="minus${key}">-</button><span class="quant" id="val${key}">${productQuantity}</span><button class="btn btn-primary mx-2 plus" id="plus${key}">+</button>`

    // set the item to the local storage
    localStorage.setItem('cart', JSON.stringify(cart));

    // count the quantity of product and change the innerHTML of
    // the cartCount popover button
    // also every time we have to initialize count to 0 so that it 
    // will not take the previous count value
    count = 0;
    document.getElementById('cartCount').innerHTML = getCartCount(cart);
    updatePopOverCart(cart);
}

// checking local storage
if(localStorage.getItem('cart') == null){
    cart = {};
}
else{
    // if found then parse it to js dict 
    // and change the text in the cartCount
    // every time we refresh it will change the cartCount popover 
    // to the quantity of product added to cart.
    cart = JSON.parse(localStorage.getItem('cart'));

    // On refresh the already added product shows with plus minus quantity button
    for (key in cart){
        if(cart[key][0] != 0){
            updateCart(cart, key);
            popOverCart.hide()
        }
    }
}
$('.cart').click(function(){
    // taking id of the clicked item
    let idStr = this.id.toString();
    // if(cart[idStr]){
    //     qty = cart[idStr] + 1;
    // }
    // else{
    //     productName = document.getElementById(`productName${idstr}`).innerHTML;
    //     qty = 1;
    //     cart[idStr] = [qty, productName]
    // }

    // creating the cart with product quantity and the product name
    productName = document.getElementById(`productName${idStr}`).innerHTML;
    qty = 1;    
    cart[idStr] = [qty, productName];
    updateCart(cart, idStr);
})


// when someone cliced + button of any product
// then it will increment the product quantity
$('.prodQuant').on("click", 'button.minus', function(){

    // getting the product id as id of the button.minus is
    // minuspr{{product.id}}, slice function slice the minus as
    // minus have 4 character
    let productId = this.id.slice(5, )
    if(cart[productId][0])
    {
        cart[productId][0] = cart[productId][0] - 1;
    }
    cart[productId][0] = Math.max(0, cart[productId][0]);
    $(`#val${productId}`).innerHTML = cart[productId][0];
    updateCart(cart, productId) 
})

// when someone cliced + button of any product
// then it will decrement the product quantity
$('.prodQuant').on("click", 'button.plus', function(){

    // getting the product id as id of the button.plus is
    // pluspr{{product.id}}, slice function slice the plus as
    // plus have 4 character
    let productId = this.id.slice(4, )
    if(cart[productId][0])
    {
        cart[productId][0] = cart[productId][0] + 1;
    }
    else{
        cart[productId][0] = 1;
    }
    $(`#val${productId}`).innerHTML = cart[productId][0];
    updateCart(cart, productId)
})

