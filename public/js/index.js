const socket = io()

socket.on('all-message', (data)=>{
 console.log(data);
 
})

const addMensage = ()=>{
    const msg = {
        dominio: document.getElementById('dominio').value,
        oblea: document.getElementById('oblea').value
    }

    socket.emit('new-message', msg)
    return false
    
}

