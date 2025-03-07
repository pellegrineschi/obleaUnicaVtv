const socket = io() 

socket.on('all-message', (data)=>{
 console.log(data);
 render(data)
 let chat = document.getElementById('caja')
 chat.scrollTop = chat.scrollHeight
 
})

const render = (data) => {
  const html = data.map((elem, index) => {
    return `
      <div class="card mb-3" data-id="${index}">
        <div class="card-body">
          <div class="d-flex justify-content-between align-items-center">
            <div class="form-check">
              <input type="checkbox" class="form-check-input" id="check-${index}">
              <label class="form-check-label" for="check-${index}">
                <strong>${elem.dominio}</strong> oblea <em>${elem.oblea}</em>
              </label>
            </div>
            <span class="text-muted">${elem.time}</span>
          </div>
          <div class="mt-2 text-end">
            <button class="btn btn-danger" onclick="deleteItem(${index})">Borrar</button>
          </div>
        </div>
      </div>
    `;
  }).join('');
  document.getElementById('caja').innerHTML = html;
}

  
  

const addMensage = ()=>{
    const msg = {
        dominio: document.getElementById('dominio').value,
        oblea: document.getElementById('oblea').value
    }

    socket.emit('new-message', msg)
    return false
    
}

function deleteItem(index) {
    // Obtener la casilla de verificación correspondiente al índice
    const checkbox = document.getElementById(`check-${index}`);
    
    // Verificar si la casilla existe y está marcada
    if (checkbox && checkbox.checked) {
      // Emitir el evento de borrado al servidor
      socket.emit('delete-message', index);
      
    } else {
      // Mostrar un mensaje si la casilla no está marcada
      alert("Tienes que confirmar la oblea");
    }
  }
  

