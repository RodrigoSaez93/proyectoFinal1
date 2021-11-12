const PersistenciaProductos=require("../persistencia/productos")

class ProductoCtrl {
     
    async listar(req, res) {
        const productos = await PersistenciaProductos.listar()
        if (productos.length === 0) {
            res.status(500).json({ error: "No hay productos cargados" });
        }
        else {
            res.json(productos);
        }
    }

    async listarPorId(req, res) {
        const producto = PersistenciaProductos.buscar(req.params.id)
        if (producto != null) {
            res.json(producto);
        }
        else {
            res.status(404).json({ error: "No se encontró el producto" });
        }
    }

    async insertar(req, res) {
        const producto = req.body;
        producto.time=time
        PersistenciaProductos.insertar(producto)        
        res.json(producto);
    }

    actualizar(req, res) {
        const productoEnLista = PersistenciaProductos.buscar(req.params.id);
         if(productoEnLista != null) 
        {
            PersistenciaProductos.actualizar(req.body)
            res.json(req.body);
        }
        else {
            res.status(404).json({error: "No se encontró el producto"});
        }
    }

    eliminar(req, res) {
        const productoAEliminar = productos.find(prod => prod.id == req.params.id);
        if(productoAEliminar != null) {
            const index = productos.indexOf(productoAEliminar);
            productos.splice(index, 1);
            res.json({mensaje: "Producto eliminado", producto: productoAEliminar});
        } else {
            res.status(404).json({error: "No se encontró el producto"});
        }
    }
}

module.exports = ProductoCtrl;