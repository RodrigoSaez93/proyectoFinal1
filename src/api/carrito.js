const carrito= []
const productos =require("./productos")
const  PersistenciaCarrito =require("../persistencia/carrito")
let id = 0;

class carritos {   
   

    listarPorId(req, res) {
       

        const item = carrito.find(prod => prod.id == req.params.id);
        if (item != null) {
            res.json(item);
        }
        else {
            res.status(404).json({ error: "No se encontró el producto" });
        }
    }

    agregar(req, res) {
        let time =Date.now()
        const item ={}
        item.timestamp=time
        item.id=++id

        const producto = productos.getProductos().find(pro=>pro.id==req.params.id_producto)
       item.producto=producto
        
        carrito.push(item);       
        const persistenciaCarrito= new PersistenciaCarrito()
        persistenciaCarrito.guardar(carrito)
        
        res.json(item);
    }

    
    eliminar(req, res) {
        const itemEliminar = carrito.find(prod => prod.id == req.params.id);
        if(itemEliminar != null) {
            const index = carrito.indexOf(itemEliminar);
            carrito.splice(index, 1);
            res.json({mensaje: "Producto eliminado", producto: itemEliminar});
        } else {
            res.status(404).json({error: "No se encontró el producto"});
        }
    }
}

module.exports = carritos;