const express=require("express")

const  router = express.Router()
const Carritos= require("../api/carrito")

const security= require("../securityMiddleware")
const carritoCtrl= new Carritos()

router.use(security)

router.get("/carrito/listar/:id",(req,res)=>{
   
    carritoCtrl.listarPorId(req,res)
})

router.post("/carrito/agregar/:id_producto",(req,res)=>{
    carritoCtrl.agregar(req,res)
})
router.delete("/carrito/borrar/:id",(req,res)=>{
    carritoCtrl.eliminar(req,res)
})

module.exports = router;