const Sequelize = require("sequelize");
const express = require("express");
const router = express.Router();
const connection = require("../database/database");
const Item = require("./Item")
const Classe = require("../classes/Classe")
const Op = Sequelize.Op; // biblioteca de operadores
const slugify = require("slugify")

// Painel de Controle
router.get("/paineldecontrole", (req, res) => {    
    Item.findAll({
        order: [
            ['id', 'DESC']
        ],
        
    }).then(items => {
        Classe.findAll().then(classes => {
            res.render("painelDeControle", {items:items, classes:classes})
        })        
    })    
})

// Listando pela classe no painel de controle
router.get("/paineldecontrole/:slug", (req,res) => {
    var slug = req.params.slug;

    Classe.findOne({
        where: {
            slug:slug
        },
        include: [{model: Item}]
    }).then( classe => {
        if(classe != undefined) {
            Classe.findAll().then(classes => {
                res.render("painelDeControle", {items: classe.items, classes:classes});
            })            
        }         
    })
})

// Search 
router.get("/search", (req, res) => {
    const {term} = req.query
    
    Item.findAll({ where: {descricao: {[Op.like]: '%' + term + '%' }}}).then(items => {
        Classe.findAll().then(classes => {
            res.render("painelDeControle", {items:items, classes:classes})
        })        
    })
})

// Página de cadastro de item

router.get("/novocodigo", (req, res) => { 
    Classe.findAll({
        order: [
            ['id', 'DESC']
        ],
        
    }).then(classes => {
        res.render("admin/items/new", {classes:classes}) 
    })           
}) 

//Salvando código de item
router.post("/items/save", (req, res) => {
    var codigo = req.body.codigo;
    var descricao = req.body.descricao;
    var medida = req.body.medida;
    var quantidade = req.body.quantidade;
    var valor = req.body.valor;
    var classe = req.body.classe;

    Item.create({
        codigo: codigo,
        descricao: descricao,
        medida: medida,
        quantidade: quantidade,
        valor: valor,
        classId: classe
    }).then(() => {                     
        res.redirect("/novocodigo");        
    })
})

// Listando items pela classe na homepage

router.get("/:slug", (req,res) => {
    var slug = req.params.slug;

    Classe.findOne({
        where: {
            slug:slug
        },
        include: [{model: Item}]
    }).then( classe => {
        if(classe != undefined) {
            Classe.findAll().then(classes => {
                res.render("index", {items: classe.items, classes:classes});
            })            
        }         
    })
})

// Incremento de quantidade
router.post("/increment", (req,res) => {    
    var id = req.body.id;
    var quantidade = req.body.quantidade;  
     
    Item.increment('quantidade', { by: quantidade, where: { id: id }}).then(() => {
        res.redirect("paineldecontrole")
    })    
})

// Decremento de quantidade
router.post("/decrement", (req,res) => {    
    var id = req.body.id;
    var quantidade = req.body.quantidade;  
     
    Item.decrement('quantidade', { by: quantidade, where: { id: id }}).then(() => {
        res.redirect("paineldecontrole")
    })    
})
 
module.exports = router;