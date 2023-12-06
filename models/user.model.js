const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;

//  περναμε την απαραίτητη βιβλιοθήκη και την εκχωρω σε μια νεα μεταβλήτη 

let addressSchema = new Schema({
    area: { type: String},
    road: { type: String}
}, {id: false}); // επειδη η Mongo σε καθεσ σχήμα δημιουργει και αυτοματα id, αλλα η διευθυνση ειναι υπο κατηγορια και δεν χριεαζεται 

let phoneSchema = new Schema ({
    type : {type: String},
    number : { type: String}
}, {id: false});

let productSchema = new Schema({
    product: { type: String},
    cost: { type: Number}, 
    quantity: { type: Number, required: true},
    date: {type: Date, default: Date.now}  //  η ημερομηνια πρεπει να ειναι Iso αλλιως με sting δεν θα κανει αναζήτηση στην Mongo
})

let userSchema = new Schema ({
    username: {
        type: String, // τυπος πεδίου
        require: [ true, 'Usare name is required field'], // ειναι απαρίτητο και εχουμε βαλει και μνμ
        max: 10, // μεγιστο αριθμο χαρακτήρων
        unique: true, // πρεπει να ειναι μοναδικό 
        trim: true, //  τριμάρει τα κενα
        lowercase: true // αν ειναι κεφαλαία το μετατρέπει σε μικρά
    },
    password: {
        type: String,
        require: [ true, 'Password is required field'],
        max: 15
    },
    name: { type: String }, 
    surname: { type: String },
    email: { 
        type: String,
        require: [ true, 'Email is required field'],
        max: 20,
        unique: true,
        trim: true,
        lowercase: true,
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 
            "Email address is not valid"
        ],
        null: false
     },
     address:addressSchema, 
     phone: { type: [phoneSchema], null: true},
     products: {type: [productSchema], null: true}

},
{
    collection: 'users',
    timestamps: true // καφε φορα που δημιουργέιται ενα document στην mongo δημιουργει ημερομηνια create at, update at . οταν ειναι true να τα δημιουργήσει 
})



userSchema.plugin(uniqueValidator); 
//  αφου εχουμε περασει και την βιβλιοθήκη unique πάνω και τωρα για να κανει τον ελεγχο για τα μοναδικα βάζουμε και το plugin

module.exports = mongoose.model('User', userSchema);
//  δίνουμε την δυνατότητα να κανει exprort τα στοιχεία και οταν θα χρησιμοποιηθει απο αλλη εφαρμογη το σχήμα μας θα 
//  μπορουμε να την καλλουμε με το User
