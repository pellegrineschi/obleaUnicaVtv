const express = require ('express')
const handlebars = require('express-handlebars')
const homeRouter = require('./routes/home.router')
const http = require('http')
const{Server}= require('socket.io')

const app = express()

const PORT = 8080 || process.env.PORT

let arrMessage = []

//SERVER HTTP
const server = http.createServer(app)

//PUBLIC
app.use(express.static(__dirname+"/public"))

//ENGINE MOTOR DE PLANTILLAS
app.engine('handlebars', handlebars.engine())
app.set('view engine', 'handlebars')
app.set('views', __dirname+'/views')

//ROUTES

app.use('/home', homeRouter)

//SOKET SERVER

const io = new Server(server)
io.on('connection', (socket)=>{
    console.log('hola nuevo cliente');
    socket.emit('welcome', 'bienbenido nuevo cliente')

    socket.on('new-message',(data)=>{
        arrMessage.push(data)
        io.emit('all-message', arrMessage)
    })

    // Listener para borrar el mensaje
  socket.on('delete-message', (index) => {
    // Eliminar el elemento del arreglo global. Nota: usar índices puede tener inconvenientes
    // si el arreglo cambia; considera usar un identificador único para cada mensaje.
    arrMessage.splice(index, 1);
    // Emitir la lista actualizada a todos los clientes
    io.emit('all-message', arrMessage);
  });
    
})


server.listen(PORT, ()=>{
    console.log("server run on port " + PORT);
    
})