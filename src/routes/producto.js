const express=require("express")

const  router = express.Router()
const security =require("../securityMiddleware")
const ProductoCtrl = require("../api/productos")

const productosCtrl = new ProductoCtrl();

router.use(security)
router.get("/productos/listar",(req,res)=>{
    productosCtrl.listar(req,res)
 
})

router.get("/productos/listar/:id",(req,res)=>{

    productosCtrl.listarPorId(req,res)
})


router.post("/productos/guardar",(req,res)=>{
    productosCtrl.insertar(req,res)
})


router.put("/productos/actualizar/:id",(req,res)=>{
    productosCtrl.actualizar(req, res)
})

router.delete("/productos/borrar/:id",(req,res)=>{
    productosCtrl.eliminar(req, res)


})

module.exports = router;