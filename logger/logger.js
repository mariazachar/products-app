// const logger = requier('winston');
 const { format , createLogger, transports} = require('winston'); 
 // όταν θελουμε να περασουμε συγκεκριμενες ιδιοτητες απο την βιβλιοθήκη και οχι ολη τη βιβλιοθήκη
 require('winston-daily-rotate-file');
 require('winston-mongodb');

 require('dotenv').config(); // την χρειαζόμαστε γιατι μεσα στο env αρχείο εχουμε στο conection string για την Mongo

// οριζουμε το format του logger δηλαδη τι θα περιεχει και πως
// επίσης ορίζουμε το χρονικό διαστημα που θα δημιουργείται νεο αρχείο 
// και τι ονομα θα έχει 

const { combine, timestamp, label, prettyPrint } = format; // απο τη format αντλώ συγκεκριμενες ιδιοτητες που χρειάζομαι 

const CATEGORY = "Winston custom format";

// τα transports ειναι οι τρόποι που γίνονται τα logs ( σε αρχείο,  σε βάση ή σε console.log)
const fileRotateTransport = new transports.DailyRotateFile({
    filename: "logs/rotate-%DATE%.log", // εξήγηση το logs/rotate-%DATE%.log που θα ειναι η ονομασια του αρχείο μου, θα δημιουργηθεί ενα αρχείο στο φάκλεο logs, με ενα λεκτικό rotate, την ημερομηνια και θα ειναι .log
    datePattern: "DD-MM-YYYY",
    maxFiles: "14d" // ποσες μέρες θα κρατάει το αρχείο μας (14 μερες). βεβαια οι διαρκεια θα ελεγχεται βάση με την συχνότητα των Logs
});

const logger = createLogger({
    level: "debug",
    format: combine( // συνεννοσε διαφορες πληροφοριες
        label({label: CATEGORY}),
        timestamp({
            format: "DD-MM-YYYY HH:mm:ss"
        }),
        // format.json()
        prettyPrint()
    ), 
    transports: [
        // Να δημιουργει ενα φακελο με το logs
        fileRotateTransport,
        new transports.File({
            filename: "logs/example.log"
        }), // σε ενα συγκεκριμενο φακελο με ονομα example
        new transports.File({
            level: "error",
            filename: "logs/error.log"
        }), // σε ενα συγκεκριμενο φακελο με ονομα error
        //  να κανει console.log τα log
        new transports.Console(),
        //  να αποθηκεύει στη mongo τα log
        new transports.MongoDB({
            level: "error",
            db: process.env.MONGODB_URI,
            options: {
                useUnifiedTropology: true
            }, // επειδη στην mongo ειμαστε συνδεδεμενοι με τη βιβλιοθήκη mongoose Και οχι με την winston( η οποια εχει παλιους σερβερς) 
            // μας παρουσιαζει προειδοπιτικο μνμ. με το παραπανω option της mongo db δεν μας εμφανίζει οποιαδηποτε μνμ 
            collection: "serve_logs",
            format: format.combine(
                format.timestamp(), // δεν βαζουμε format στην ημερομηνία γιατι στη mongo Θ απρεπει να ειναι ISO
                format.json()
        )
        }) // με το process.env διαβαζουμε οποια μεταβλήτη υπάρχει στο env αρχείο
    ]
})
module.exports = logger;

