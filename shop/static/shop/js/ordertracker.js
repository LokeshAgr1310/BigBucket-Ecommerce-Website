$('#trackerForm').submit(function(e){

    $('#items').empty();
    e.preventDefault();
    let formData = {
        'orderId': $('input[name=orderId]').val(),
        'email': $('input[name=inputEmail]').val(),
        'csrfmiddlewaretoken': $('input[name=csrfmiddlewaretoken]').val()
    }
    let ulItem = $('#items');
    let myStr = "";
    $.ajax({
        type: 'POST',
        url: '/shop/tracker/',
        data: formData,
        encode: true
    })
    .done(function(data){
        let allData = JSON.parse(data);
        let updatesList = allData[0];
        if(updatesList.length>0 & updatesList!={}){
            for(i=0; i<updatesList.length; i++){
                let updateDesc = updatesList[i]['desc'];
                let time = updatesList[i]['updateDate'];
                myStr = `<li class="list-group-item d-flex justify-content-between align-items-center">
                    ${updateDesc}
                    <span class="badge rounded-pill bg-primary">${Date(time)}</span>
                    </li>`
                ulItem.append(myStr);
            }
        }
        else{
            myStr = `<li class="list-group-item d-flex justify-content-between align-items-center">
                Sorry, we are not able to fetch this orderId and email. Make sure to type correct orderId and email... </li>`
            ulItem.append(myStr);
        }
        cart = JSON.parse(allData[1])
        for(key in cart){
            let productName = cart[key][1];
            let qty = cart[key][0]
            myStr = `<li class="list-group-item d-flex justify-content-between align-items-center">
                ${productName}
                <span class="badge rounded-pill bg-primary">${qty}</span>
            </li>`
            $('#productItems').append(myStr);
        }
    })
})
