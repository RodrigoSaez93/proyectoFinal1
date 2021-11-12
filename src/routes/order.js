const express=require("express")

const  router = express.Router()

const OrderCtrl = require('../api/order')
const orderCtrl = new OrderCtrl()

router.post('/order/:id', (req, res)=> {
    orderCtrl.makeOrder(req, res)
})


module.exports = router