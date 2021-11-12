const PersistenciaCarrito =require("../persistencia/carrito")

class CarritoCtrl {   
   

    async listarPorId(req, res) {
       
        const item = await PersistenciaCarrito.buscar(req.params.id)
        
        if (item != null) {
            res.json(item);
        }
        else {
            res.status(404).json({ error: "No se encontró el carrito" });
        }
    }

    async agregar(req, res) {
        let time =Date.now()
        const item ={}
        item.timestamp=time

        item.producto=req.params.id_producto
        
        await PersistenciaCarrito.insertar(item)
        
        res.json(item);
    }

    async update(req, res) {
        const carrito = req.body;
        await PersistenciaCarrito.actualizar(carrito)
    }

    
    async eliminar(req, res) {
        const itemEliminar = await PersistenciaCarrito.buscar(req.params.id)
        if(itemEliminar != null) {
            await PersistenciaCarrito.eliminar(req.params.id)
            res.json({mensaje: "Carrito eliminado", producto: itemEliminar});
        } else {
            res.status(404).json({error: "No se encontró el carrito"});
        }
    }
}

module.exports = CarritoCtrl;