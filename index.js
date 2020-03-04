//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");

// create a date object that requires the date.js file
const date = require(__dirname + "/date.js");

const app = express();

// set an array for the default items in the list
let items = ["Buy Food", "Prepare Food", "Cook Food", "Eat Food", "Store Food"];
// set an empty array for new work items
let workItems = ["Show Up", "Get Settled"];
let funItems = ["Watch Movie", "Gamble", "Watch Tv", "Go Bowling" ];

// set EJS as the viewing engine to display html
app.set('view engine', 'ejs');

// use body parser to parse html file
app.use(bodyParser.urlencoded({extended: true}));
// use Express to serve or display static files such as images, CSS, JS files etc.
app.use(express.static("public"));


// default html file in web server
app.get("/", function(req, res) {

    //get the system date from the getDate function exported by the date.js file
    let day = date.getDate();
    
    // use EJS render to display the day and the To Do List
    res.render("list", {listTitle: day, newListItems: items});
    
});

// display default to do list on the default root folder
app.post("/", function(req, res) {
    
    
    // code allows items to be added to the regular list and work list
    let item = req.body.newItem;
    
    if (req.body.list === "Work") {
        workItems.push(item);
        res.redirect("/work");
     } else {
        items.push(item);
        res.redirect("/");
    }
    if (req.body.list === "fun") {
        workItems.push(item);
        res.redirect("/fun");
    } else {
        items.push(item);
        res.redirect("/");
    }
});

// display default to do list on the localhost:3000/work route!
app.get("/work", function(req, res){
    res.render("list", {listTitle: "Work To Do List", newListItems: workItems})
});

app.get("/fun", function(req, res){
    res.render("list", {listTitle: "Fun To Do List", newListItems: funItems})
});

app.listen(3000, function() {
console.log ("Server is running on port 3000")
});