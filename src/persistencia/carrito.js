const mongoose = require('mongoose')
const PersistenciaProductos = require('./productos')

const CarritoSchema = new mongoose.Schema({
    timestamp: Number,
    productos: [String]
})

const CarritoModel = mongoose.model('carritos', CarritoSchema)

class PersistenciaCarrito{
    static async insertar(carrito) {
        const carritoNuevo = new CarritoModel(carrito)
        return await carritoNuevo.save()
    }

    static async buscar(id) {
        const carrito =  await CarritoModel.findById(id).exec()
        const listaProductos = []
        if(carrito.productos != null) {
            carrito.productos.forEach(idProd => {
                const producto = await PersistenciaProductos.buscar(idProd)
                listaProductos.push(producto)
            })
        }
        return {_id: carrito._id, productos: listaProductos};
    }

    static async listar() {
        return await CarritoModel.find({})
    }

    static async actualizar(carrito) {
        return await CarritoModel.updateOne({_id: carrito.id}, carrito)
    }

    static async eliminar(id) {
        return await CarritoModel.deleteOne({_id: id})
    }
}

module.exports=PersistenciaCarrito