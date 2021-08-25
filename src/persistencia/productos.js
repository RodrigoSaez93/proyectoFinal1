const FileHandler= require("./FileHandler")

const fileHandler = new FileHandler("productos.txt")

class PersistenaciaProductos{
    async guardar(productos){
       await fileHandler.append(JSON.stringify(productos))
    }
}

module.exports=PersistenaciaProductos