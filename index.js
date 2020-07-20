const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const connection = require("./database/database");
var session = require('express-session')
var flash = require('express-flash')
var cookieParser = require('cookie-parser')
var moment = require('moment'); // biblioteca de formatação de data e hora: moment.js 

const classesItem = require("./items/ItemController");
const Item = require("./items/Item");
const classesController = require("./classes/ClassesController");
const Classe = require("./classes/Classe");
const usersController = require("./user/UserController");
const User = require("./user/User")

//View
app.set("view engine", "ejs");

/* 
app.use(session({
    secret: "njkre", cookie: { maxAge: 30000}
})) */

//Static
app.use(express.static("public"));

// Body Parser
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use(cookieParser("nkrj"))
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }
  }))

  app.use(flash())

// Database

connection.authenticate().then(() => {
    console.log("Autenticação feita com sucesso!");
    }).catch((error) => { 
        console.log(error);    
}); 

app.use("/", classesController)
app.use("/", classesItem)
app.use("/", usersController)

// Página Inicial
app.get("/", (req, res) => {
    Item.findAll({
        order: [
            ['id', 'DESC']
        ],        
        
    }).then(items => {
        Classe.findAll().then(classes => {
            res.render("index", {items:items, classes:classes})
        })        
    })    
})

app.listen("4000", () => {
    console.log("O sevidor está rodando pela porta 4000")
})