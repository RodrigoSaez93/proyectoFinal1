const express = require("express");
const router = express.Router();
const passport = require('passport')
const checkAuthentication = require('../middleware/checkAuthentication')
const nodemailer = require('nodemailer')
const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'bria.jacobi27@ethereal.email',
        pass: 'wFyguFtJp8gvyxaadN'
    }
});

router.get('/', checkAuthentication, (req, res) => {
    res.render("index")
})

router.get("/login", (req, res) => {
    if(req.isAuthenticated()) {
        console.log('usuario logueado')
        res.redirect('/')
    }else {
        res.render("login");

    }
})

router.get("/signup", (req, res) => {
    res.render('signup')
})

router.get("/login-error", (req, res) => {
    res.render("login-error")
})

router.get("/signup-error", (req, res)=> {
    res.render("signup-error")
})


router.post("/login", passport.authenticate('login', {failureRedirect: 'login-error'}), (req, res) => {
    res.redirect("/");
})

router.post("/signup",passport.authenticate('signup', {failureRedirect: 'login-error'}), (req, res) => {
    const datosUsuarioText = ''
    datosUsuarioText += `<p>Email: ${req.body.email}</p>`
    datosUsuarioText += `<p>Password: ${req.body.password}</p>`
    datosUsuarioText += `<p>Nombre: ${req.body.name}</p>`
    datosUsuarioText += `<p>Edad: ${req.body.age}</p>`
    datosUsuarioText += `<p>Direccion: ${req.body.address}</p>`
    datosUsuarioText += `<p>Telefono: ${req.body.phoneNumber}</p>`
    datosUsuarioText += `<p>Imagen: ${req.body.picture}</p>`
    const mailOptions={
        from:'Servidor de node.js',
        to:'bria.jacobi27@ethereal.email' ,
        subject:` Nuevo usuario registrado - ${new Date().toUTCString()} `,
        html:'<h1>Pedido</h1> ' + datosUsuarioText

    }

    transporter.sendMail(mailOptions,(err,info)=>{
        if(err){
            console.log(err)
            return err
        }
        console.log(info)
    })
    res.redirect("/"); 
})

router.get("/logout", (req, res) => {
    req.session.destroy();
    req.logout()
    res.render("logout", data)
})

module.exports = router;