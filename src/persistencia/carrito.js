const { json } = require("express")
const FileHandler= require("./FileHandler")

const fileHandler = new FileHandler("carrito.txt")

class PersistenaciaCarrito{
    async guardar(carrito){
       await fileHandler.append(JSON.stringify(carrito))
    }
}

module.exports=PersistenaciaCarrito