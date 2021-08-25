const express = require("express");
const app = express();
const puerto =8080
const productos =require("./routes/producto")
const carrito =require("./routes/carrito")

app.use(express.json());
app.use("/", productos)
app.use("/",carrito)
app.listen(puerto, () => {
    console.log( `El servidor está escuchando en el puerto ${puerto}`)
})