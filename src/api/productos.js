const productos =[ ]

const PersistenaciaProductos=require("../persistencia/productos")
let id = 0;

class productoss {
    static getProductos() {
        return productos;
    }
    
    listar(req, res) {
        if (productos.length === 0) {
            res.status(500).json({ error: "No hay productos cargados" });
        }
        else {
            res.json(productos);
        }
    }

    listarPorId(req, res) {
        const producto = productos.find(prod => prod.id == req.params.id);
        if (producto != null) {
            res.json(producto);
        }
        else {
            res.status(404).json({ error: "No se encontró el producto" });
        }
    }

    insertar(req, res) {
        const producto = req.body;
        let time =Date.now()
        producto.id = ++id;
        producto.time=time

          const persistenaciaProductos= new PersistenaciaProductos()
        persistenaciaProductos.guardar(producto)


        productos.push(producto);
        

        res.json(producto);
    }

    actualizar(req, res) {
        const productoEnLista = productos.find(prod => prod.id == req.params.id);
        if(productoEnLista != null) 
        {
            const index = productos.indexOf(productoEnLista);        
            req.body.id = req.params.id;
            productos[index] = req.body; 
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

module.exports = productoss;