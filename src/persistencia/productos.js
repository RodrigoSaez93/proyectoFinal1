const mongoose = require('mongoose')

const ProductoSchema = new mongoose.Schema({
    title: {type: String, required: true, max: 100},
    price: {type:String, required: true, max: 100},
    thumbnail: {type:String, required: true, max: 100},
    timestamp: {type: Number, required: true}
})

const ProductoModel = mongoose.model('productos', ProductoSchema)

class PersistenciaProductos{
    static async insertar(producto) {
        const productoNuevo = new ProductoModel(producto)
        return await productoNuevo.save()
    }

    static async buscar(id) {
        return await ProductoModel.findById(id).exec()
    }

    static async listar() {
        return await ProductoModel.find({});
    }

    static async actualizar(producto) {
        return await ProductoModel.updateOne({_id: producto._id}, producto);
    }

    static async eliminar(id) {
        return await ProductoModel.deleteOne({_id: id})
    }

}

module.exports=PersistenciaProductos