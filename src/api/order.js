
const PersistenciaCarrito =require("../persistencia/carrito")
const accountSid= process.env.TWILIO_SID
const authToken= process.env.TWILIO_TOKEN
const client =require('twilio')(accountSid,authToken)
const number = '+549115612344'

const nodemailer = require('nodemailer')
const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'bria.jacobi27@ethereal.email',
        pass: 'wFyguFtJp8gvyxaadN'
    }
});

class OrderCtrl {
    async makeOrder(req, res) {
        const carrito = await PersistenciaCarrito.buscar(req.params.id)

        if (carrito != null) {
            let productosText = ''
            carrito.productos.forEach(prod => {
                productosText += `<p>${prod.title}</p>`
            })
            const mailOptions={
                from:'Servidor de node.js',
                to:'bria.jacobi27@ethereal.email' ,
                subject:` Nuevo pedido de ${req.user.name} - ${req.user.username} ${new Date().toUTCString()} `,
                html:'<h1>Pedido</h1> ' + productosText
        
            }

            transporter.sendMail(mailOptions,(err,info)=>{
                if(err){
                    console.log(err)
                    return err
                }
                console.log(info)
            })

            client.messages.create({
                body:` Nuevo pedido de ${req.user.name} - ${req.user.username} ${new Date().toUTCString()} `,
                from:'+19714061392',
                to: number
            })

            res.json(carrito);


        }
        else {
            res.status(404).json({ error: "No se encontró el carrito" });
        }
    }
}

module.exports = OrderCtrl