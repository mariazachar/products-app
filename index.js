const express = require('express');

const mongoose = require('mongoose');
const app = express();
const port = 3000;
const cors = require('cors');

const user = require('./routes/user.route');
const product = require('./routes/products.route');
const user_products = require('./routes/user-products.route');


app.use(express.json());
app.use(express.urlencoded({extended: false}));
const swaggerUI = require('swagger-ui-express'); // εκχωρούμε τις ιδιοτητες της βιβλιοθηκης στη μεταβλητη 
const swaggerDocument = require('./swagger'); // του λεμε να διαβασει τη σελιδα swagger.js

require('dotenv').config();

// συνδεόμαστε με την βάση μας (promisse  συναρτηση)
mongoose.connect(process.env.MONGODB_URI) //Connection string απο την MongoDB
    .then (
        ()=> { console.log('Connection with database establised')},
        err => {console.log('Failed to connect to MongoDB', err)}
    );

 app.use(cors({
    origin: '*'
 })) // επιτρέπω απο παντου (αλλους σερβερ) να δεχομαι κλήσεις, συνηθως απο api εφαρμογες επιτρεπουμε απο παντου

//  app.use(cors({
//     origin: ['http://www.example.com', 'http://localhost:8000' ]
//  })) 
 // επιτρέπω απο συγκεκριμένους σερβερ να δεχομαι κλήσεις


// αντι να γραψουμε ολες τις κλήσεις μας μεσα σε ενα αρχείο και να γίνει δισνοητο
//  δημιουργουμε ενδιάμεσς συναρτήσεις που θα επιτρέπει να γινονται αλλου οι κλήσεις μας
//  αν η ενδιαμεση συναρτηση στο route ειχε "/" θα ηταν για ολη την εφαρμογη 
//  μετα το '/api/...' θα βάλουμε το ονομα των μεταβλητων που εχουν δηλώθει παραπανω και κανει require τη διευθυνση 
//  οι ενδιαμεσες συναρτήσεις routing θα δημιουργηθουν στο φακελο route

app.use('/', express.static('files')); // θα καλέσει μια σελιδα web

app.use('/api/users', user);
app.use('/api/products', product);
app.use('/api/user-products', user_products);
app.use('/api-docs',
swaggerUI.serve, 
swaggerUI.setup(swaggerDocument.options)) 
// θα μας δωσει μια web σελιδα και θα μας εφανίσει τα δεδομένα που υπαρχουν ,,, στη σελιδα swagger θα υπαρχει μια μεταβλήτη με στοιχεία που θελουμε να εμφανίσει 

app.listen(port , () => {
    console.log('Listening on port 3000')
})