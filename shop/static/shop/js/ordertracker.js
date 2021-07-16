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
        ulItem.empty();
        $('#productItems').empty();
        let allData = JSON.parse(data);
        if(allData['status'] == 'success'){
            let updatesList = allData['updates'];
            for(i=0; i<updatesList.length; i++){
                let updateDesc = updatesList[i]['desc'];
                let time = updatesList[i]['updateDate'];
                myStr = `<li class="list-group-item d-flex justify-content-between align-items-center">
                    ${updateDesc}
                    <span class="badge rounded-pill bg-primary">${Date(time)}</span>
                    </li>`
                ulItem.append(myStr);
            }
            cart = JSON.parse(allData['itemsJson'])
            for(key in cart){
                let productName = cart[key][1];
                let qty = cart[key][0]
                myStr = `<li class="list-group-item d-flex justify-content-between align-items-center">
                    ${productName}
                    <span class="badge rounded-pill bg-primary">${qty}</span>
                </li>`
                $('#productItems').append(myStr);
            }
        }
        else{
            myStr = `<li class="list-group-item d-flex justify-content-between align-items-center">
                Sorry, we are not able to fetch this orderId and email. Make sure to type correct orderId and email... </li>`
            ulItem.append(myStr);
        }
    })
})
