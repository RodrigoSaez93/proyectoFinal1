function security (req,res,next){
    let administrador = true

    if (administrador){

        next();

    }else{

        res.status(401).json({
            error:-1,
            description:`Ruta ${req.route.path} metodo ${req.method} no autorizada`
        })
}
    }
module.exports=security