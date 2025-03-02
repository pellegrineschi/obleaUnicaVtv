const socket = io()

socket.on('all-message', (data)=>{
 console.log(data);
 render(data)
 let chat = document.getElementById('caja')
 chat.scrollTop = chat.scrollHeight
 
})

const render = (data)=>{

   const html = data.map(elem=>{
        return(
        `
        <div>
            <strong>${elem.dominio}</strong> oblea <em>${elem.oblea}</em>
        </div>
        `  
        )
        
    }).join(' ')
    document.getElementById('caja').innerHTML = html

}

const addMensage = ()=>{
    const msg = {
        dominio: document.getElementById('dominio').value,
        oblea: document.getElementById('oblea').value
    }

    socket.emit('new-message', msg)
    return false
    
}

