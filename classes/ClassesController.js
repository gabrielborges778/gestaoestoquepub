const express = require("express");
const router = express.Router();
const Classe = require("./Classe");
const Item = require("../items/Item");
const slugify = require("slugify");

// Página de cadastro de classe
router.get("/cadastroclasse", (req, res) => {
    res.render("admin/classes/new")
})

//Salvando cadastro de classe
router.post("/classes/save", (req, res) => {
    var {grupo, classe, titulo} = req.body;
    

    Classe.create({
        grupo: grupo,
        classe: classe,
        titulo: titulo,
        slug: slugify(titulo)    
    }).then(() => {                     
        res.redirect("/novocodigo");        
    })
}) 


module.exports = router;