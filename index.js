const express = require ('express')
const handlebars = require('express-handlebars')
const homeRouter = require('./routes/home.router')

const app = express()

const PORT = 8080 || process.env.PORT

//PUBLIC
app.use(express.static(__dirname+"/public"))

//ENGINE MOTOR DE PLANTILLAS
app.engine('handlebars', handlebars.engine())
app.set('view engine', 'handlebars')
app.set('views', __dirname+'/views')

//ROUTES

app.use('/home', homeRouter)

app.listen(PORT, ()=>{
    console.log("server run on port " + PORT);
    
})