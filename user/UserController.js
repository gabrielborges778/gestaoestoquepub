const express = require('express')
const router = express.Router()
const User = require('./User')
var bcrypt = require('bcryptjs')


router.get("/login", (req, res) => {
    res.send("Tela de Login")
})

//Cadastro usuário
router.get("/cadastro", (req, res) => {
    res.render("admin/users/create")
})

// Formação de cadastro de usuário
router.post("/users/create", (req, res) => {
    var email = req.body.email;
    var password = req.body.password;

    User.findOne({where: {email:email}}).then((user) => {
        if(user == undefined) {
            var salt = bcrypt.genSaltSync(10);
            var hash = bcrypt.hashSync(password, salt);

            User.create({
                email:email,
                password:hash
            }).then(() => {
                res.redirect("/")
            }).catch((err) => {
                res.json({email, password})
            })
        } else {
            res.redirect("/cadastrologin")
        }
    })   
})

//Lista de usuários
router.get("/usuarios", (req, res) => {
    User.findAll().then(users => {
        res.render('admin/users/index', {users:users})
    })
})

module.exports = router