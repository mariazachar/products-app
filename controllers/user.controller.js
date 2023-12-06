const { default: mongoose } = require('mongoose');
const User = require('../models/user.model');
//  απο το αρχείο user.model στο export ειχαμε ορισει μια μεταβλητη User σαν όνομα για το σχήμα μας
// δημιουργουμε τη μεταβλήτη User εδω και λεμε απο ποιο Path θα αντλήσει στοχεία 

const logger = require("../logger/logger")


// πρεπει η διαδικασια να γινει export ωστε να μπορει να διαβαστει απο αλλη σεόδα της εφαρμογης μου 
exports.findAll = async(req, res) => {
    console.log("Find all users");

    try {
        const result = await User.find({}); // στη μεταβλήτη θα βάλω τα αποτελέσματα που δεχετε απο την κλήση User.find. και επειδη η mongoose περνει μονο ασυχρονες βάζω await
        res.status(200).json({status:true, data: result});
        console.log("Success in reading all users")
        logger.info("log Info succes in reading all users")
        logger.error(">>> Problem in reading all users")
        // logger.log("logger succes in reading all users")
    } catch(err) {
        res.status(400).json({status:false, data: err})
        logger.error("Problem in reading all users")
        console.log("Problem in reading all users")
    }
   
}

// User.find() = db.getCollection('users').find({}) απο το studio 3t

// find all με call back  αλλα δεν υποστηρίζεται στο mongoose version 7 και πανω 
// exports.findAll = function (req, res) {
//     console.log("Find all users")
//     User.find((err, results) => {
//         if (err) {
//             res.status(400).json({status:false, data: err})
//             console.log("Problem in reading all users")
//         } else {
//             res.status(200).json({status:true, data: result});
//             console.log("Success in reading all users")
//         }
//     })
// }
// 
//  User.findOne({username: username}, (err, result) => {

// })



exports.findOne = async(req, res) => {
    const username = req.params.username // το username στο req.params ειναι το ονομα της μεταβλητης που εχει δηλωθει στο route στην get κλήσει για το findOne
    console.log("Find user with username:", username) // αντι για δημιουργια μεταβλητης απο πανω που καλουμε εδω θα μπορουσαμε να περασουμε απευθειας req.params.username
    try {
        const result = await User.find({username: username})
        res.status(200).json({status:true, data: result});
    } catch(err) {
        res.status(400).json({status:false, data: err})
        console.log("Problem in reading user with username: ", username)
    }
    
}

exports.create = async(req, res) => {
    const newUser = new User({
        username: req.body.username,
        password: req.body.password,
        name: req.body.name,
        surname: req.body.surname,
        email: req.body.email,
        address: req.body.address,
        phone: req.body.phone,
        products: req.body.products
    })
    //  Δηλώσαμε μια μεταβλητη που ειναι τυπου User (μεταβλητη που εχει δηλωθει στην αρχη και έχει εκχωρηθει το σχήμα μας)
    // και μεσα σε αυτη τη μεταβλητη περνάμε τις παραμέτρους του σχήματος μας
    
    console.log("Insert users with username:", req.body.username);

    try {
        const result = await newUser.save();
        res.status(200).json({status:true, data: result});
        console.log("Success in inserting user with username:", req.body.username)
    } catch(err) {
        res.status(400).json({status:false, data: err})
        console.log("Problem in inserting user with username: ", req.body.username)
    }
}

exports.update = async( req, res) => {
    const username = req.body.username;

    console.log( "Update user with username:", username);
    const updateUser = {
        name: req.body.name,
        surname: req.body.surname,
        email: req.body.email,
        address: req.body.address,
        phone: req.body.phone
    }

    try {
        const result = await User.findOneAndUpdate({username: username}, updateUser, {new: true}); //  {new: true} όταν δεν υπάρχει ο χρήστης τοτε να τον δημιουργήσει αλλα θα πρεπει να είχα δηλώσει και τα παιδια user name και password
        res.status(200).json({status:true, data: result});
        console.log("Success in updating user with username:", username) 
    } catch(err) {
        res.status(400).json({status:false, data: err})
        console.log("Problem in upadating user with username: ", username)
    }
}
exports.delete = async(req, res) => {
    const username = req.params.username;
    console.log("Delete user with username:", username)

    try {
        const result = await User.findOneAndDelete({username: username});
        res.status(200).json({status:true, data: result});
        console.log("Success in deleting user with username:", username);
    } catch(err) {
        res.status(400).json({status:false, data: err});
        console.log("Problem in deleting user with username: ", username);
    }
}

//  Η find one επιστρεφει το πρωτο που θα βρει και ικανοποει το κριτηριο. επιστεφει object 
//  η find τα επιστρεφει σε ενα πινακα

//  εναλλακτικα θα μπορουσαμε να μην έχουμε το export στην findAll
// και να γράψω  μετα module.exprot = {findAll}