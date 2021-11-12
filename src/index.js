require('dotenv').config()
require('dotenv').config()

const express = require("express");
const app = express();
let port = process.env.PORT || 8080
const productos =require("./routes/producto")
const carrito =require("./routes/carrito")
const orderRoutes = require("./routes/order")
const webRoutes = require("./routes/web")
const log4js= require('log4js')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const UserModel = require('./persistencia/user')
const createHash = require('./persistencia/createHash')
const isValidPassword = require('./persistencia/isValidPassword')
const cluster = require('cluster')
const handlebars = require("hbs");

const advancedOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}
let modoCluster= false

// Configurar logs 
log4js.configure({
    appenders:{
        miLoggerConsole:{type:"console"},
        miLoggerFile:{type:'file',filename:'warn.log'},
        miLoggerFile2:{type:'file',filename:'error.log'}
    },
    categories: {
        default:{appenders:["miLoggerConsole"],level:"debug"},
        archivo:{appenders:['miLoggerFile'],level:"warn"},
        archivo2:{appenders:['miLoggerFile2'],level:"error"}
    }
})
const logger = log4js.getLogger()
if(argv[2] != null) {
    const args = argv[2].split(" ")
    args.forEach(arg => {
        if(arg.indexOf("=") != -1) {
            const split = arg.split("=")
            if (split[0] == "CLUSTER"){
                modoCluster=true
            }
        }
    })
}

app.use(express.json());
app.use(express.urlencoded());

app.set("view engine", "hbs");

app.use("/", productos)
app.use("/",carrito)
app.use("/", orderRoutes)
app.use("/", webRoutes)

//conecto la base de datos
CRUD()

async function CRUD(){
   const URL= process.env.DB_MONGO
   
    let rta =await mongoose.connect(URL,advancedOptions)
    console.log("BASE DE DATOS CONECTADA")
}

passport.use('login', new LocalStrategy({
    passReqToCallback: true
}, function(req, username, password, done) {
    UserModel.findOne({email: username}, function(err, user) {
        if(err) {
            return done(err)
        }
        if(!user) {
            return done(null, false)
        }
        if(!isValidPassword(user, password)) {
            console.log('invalid password')

            return done(null, false)
        }
        return done(null, user)
    })
}))

passport.serializeUser(function(user, done) {
    done(null, user._id)
})

passport.deserializeUser(function(id, none) {
    UserModel.findById(id, function(err, user) {
        done(err, user)
    })
})

app.use(passport.initialize())
app.use(passport.session())

passport.use('signup', new LocalStrategy({
    passReqToCallback: true
}), function(req, username, password, name, address, age, done) {
    User.findOne({email: username}, function(err, user) {
        if(err) {
            return done(err)
        }

        if(user) {
            return done(null, false)
        } else {
            const newUser = new UserModel()
            newUser.email = username
            newUser.password = createHash(password)
            newUser.save(function(err) {
                if(err) {
                    throw err;
                }
                return done(null, newUser)
            })
        }
    })
})

if(modoCluster) {
    if(cluster.isMaster) {
        logger.info(`Master ${process.pid} is running`)
        for (let i =0;i<numCPUs;i++){
            cluster.fork()
        }

        cluster.on('exit',(worker,code,signal)=>{
            logger.warn(`worker ${worker.process.pid} died`)
            
        })
    } else {
        app.listen(port, () => {
            console.log( `El servidor está escuchando en el puerto ${port}`)
        })
    }
} else {
    app.listen(port, () => {
        console.log( `El servidor está escuchando en el puerto ${port}`)
    })    
}