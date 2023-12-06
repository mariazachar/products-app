$(document).ready(function(){

$.ajax({
    url: 'http://localhost:3000/api/products',
    type: 'get',
    dataType: 'JSON'
})
    .done(function(response){

        let data = response.data;
        let status = response.status;

        if (status) { 
            createTbody(data)
        } else {
            console.log("Πρόβλημα στην αναζήτηση των προιόντων")
        }
    })

    $('.row').on('click','.btnSubmit', function() {
       
        let product = $('#product').val();
        let cost = $('#cost').val();
        let description = $('#description').val();
        let quantity = $('#quantity').val();
    

        
        const item = {
            'product': product,
            'cost': cost,
            'description': description,
            'quantity': quantity
        }

        console.log(item);

        $.ajax({
            url: "http://localhost:3000/api/products",
            type: "post",
            data: item,
            dataType: "JSON"
        })
        .done(function (response){
            console.log(response);
        })

    });
}); 

function createTbody(data){
    const len = data.length;

    for (let i=0; i<len; i++){
        let product = data[i].product;
        let cost = data[i].cost;
        let description = data[i].description;
        let quantity = data[i].quantity;


        let tr_str = "<tr>" + 
        "<td>" + product + "</td>" +
        "<td>" + cost + "</td>" +
        "<td>" + description + "</td>" +
        "<td>" + quantity + "</td>" +
        "</tr>";

        $("#userTabel tbody").append(tr_str); 
    }
} 