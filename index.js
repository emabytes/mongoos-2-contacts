const express = require('express');
const app = express()
const mongoose = require('mongoose');
const ContactItem = require('./models/contactItem'); //import model

//.use - Middleware
app.use(express.static('public'))
//Parsing Form - getting data from a form
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//ejs
app.set('view engine', 'ejs')

//connect with cluster
const dbUri = "mongodb+srv://supercode:supercode@cluster0.2kvja.mongodb.net/superDatabase?retryWrites=true&w=majority"


mongoose.connect(dbUri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => {
        console.log("connected to db")
        //first connect, then listen
        app.listen(3333, () => {
            console.log("server listening at http://localhost:3333")
        })
    })
    .catch(err => console.log(err))

app.get('/', (req, res) => {
    //  res.send('hello world')
    // res.render("index")
    ContactItem.find()
        .then(result => {
            res.render("index", { contacts: result })
        })
})

app.get('/new', (req, res) => {
    res.render("new")
})

app.post('/new', (req, res) => {
    const newContactCard = new ContactItem({ //newContactCard is an instance of ContactItem model
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        imgURL: req.body.imgURL
    })
    newContactCard.save() //promise //save in db collection
        .then(result => {
            console.log("Info saved to database")
            res.redirect("/")
        })
        .catch(err => console.log(err))
})

// app.get('/single', (req, res) => {
//     res.render("single")
// })

app.get("/single/:id", (req, res) => {
    console.log(req.params.id);
    ContactItem.findById(req.params.id)
        .then(result => {
            res.render('single', { contact: result })
        })
        .catch(err => console.log(err))
})


app.get("/single/:id/delete", (req, res) => {
    ContactItem.findByIdAndDelete(req.params.id)
        .then(result => {
            res.redirect('/')
        })
        .catch(err => console.log(err))
})
app.post('/single/:id/edit', (req, res) => {
    const updatedContact = {
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        url: req.body.url,
    }
    ContactItem.findByIdAndUpdate(req.params.id, updatedContact)
        .then(result => {
            res.redirect(`/single/${req.params.id}`)
        })
        .catch(err => console.log(err))
})

