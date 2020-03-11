let express = require('express'); // Import express
let bodyParser = require('body-parser'); // Import Body parser
let mongoose = require('mongoose'); // Import Mongoose
let app = express(); // Initialize the app
let Book = require("./Book.model"); //import model from book.model.js
var port = 8080; //port 

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended : true
}));

let db = "mongodb://localhost/example";
mongoose.connect(db);

app.get("/", function(req,res){
    res.send("Welcome to the CRUD operations !!!!!!!");
})

app.get("/books", function(req,res){
    console.log("Show all Books");
    Book.find({})
        .exec(function (err, books){
            if(err){
                res.send("err has occured");
            }
            else{
                console.log(books);
                res.json(books);
            }
    });
});

app.get("/books/:id", function(req, res) {
    console.log("Getting one book.");
    Book.findOne({
        _id: req.params.id
    })
    .exec(function(err, books) {
        if(err){
            res.send("err has occured");
        }
        else{
            console.log(books);
            res.json(books);
        }
    })
})

app.post("/books", function(req, res){
    var newbooks = new Book();
    
    newBook.title = req.body.title;
    newBook.author = req.body.author;
    newBook.category = req.body.category;

    newBook.save(function (err, books){
        if(err){
            res.send("err has occured while saving");
        }
        else{
            console.log(books);
            res.send(books);
        }
    })
})

app.post("/books2", function(req, res){
    Book.create(req.body, function(err, books){
        if (err){
            res.send("err has occured saving the book");
        }
        else{
            console.log(books);
            res.send(books);
        }
    })
})

app.put("/books/:id", function(req, res) {
    console.log("update kar");
    Book.findOneAndUpdate({
        _id : req.params.id
    },
    {$set : {title : req.body.title}},
    {upsert : true},
    function(err, newbooks){
        if(err){
            res.send("err has occured while updatind the data");
        }
        else{
            console.log(newbooks);
            res.send(newbooks);
        }
    });
})

app.delete("/books/:id", function(req, res) {
    Book.findOneAndRemove({
        _id : req.params.id
    },
    function(err, books){
        if(err){
            res.send("err has occured during remove");
        }
        else{
            console.log(books);
            res.send(books);
        }
    }
    )
})

app.listen(port, function() {
    console.log("app listening on the port" + port);
})