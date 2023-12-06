$(document).ready(function(){

$.ajax({
    url: 'http://localhost:3000/api/procusts',
    type: 'get',
    dataType: 'JSON'
})
    .done(function(response){
        // console.log(response);

        let data = response.data;
        let status = response.status;

        if (status) { // αν το στατους ειναι true τοτε να γεμίσει το πίνακα στη σελιδα
            createTbody(data)
        } else {
            console.log("Πρόβλημα στην αναζήτηση των χρηστών")
        }
    })

    $('.row').on('click','.btnSubmit', function() {
        // console.log("Hello form");

        let username = $('#username').val(); //αναζήτησε το πεδίο username και παρε τα στοιχεία του (val)
        let password = $('#password').val();
        let name = $('#name').val();
        let surname = $('#surname').val();
        let email = $('#email').val();

        // console.log(username, password, name, surname, email);
        
        const item = {
            'username': username,
            'password': password,
            'name': name,
            'surname': surname,
            'email': email
        }

        console.log(item);

        $.ajax({
            url: "http://localhost:3000/api/users",
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
    // console.log("createTbody", data);
    const len = data.length;
//  διαβάζω με την for το array των δεδομένων που έχω 
    for (let i=0; i<len; i++){
        let username = data[i].username;
        let name = data[i].name;
        let surname = data[i].surname;
        let email = data[i].email;
        // console.log(username, name, surname, email);

//  εκχωρω τα δεδομένα που εχω διαβασει με την for απο πανω 

        let tr_str = "<tr>" + 
        "<td>" + username + "</td>" +
        "<td>" + name + "</td>" +
        "<td>" + surname + "</td>" +
        "<td>" + email + "</td>" +
        "</tr>";

        $("#userTabel tbody").append(tr_str); 
    }
} 