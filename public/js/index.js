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
          <div class="card-body d-flex justify-content-between align-items-center">
            <div class="form-check">
              <input type="checkbox" class="form-check-input" id="check-${index}">
              <label class="form-check-label" for="check-${index}">
                <strong>${elem.dominio}</strong> oblea <em>${elem.oblea}</em>
              </label>
            </div>
            <button class="btn btn-danger" onclick="deleteItem(${index})">Borrar</button>
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
      // Buscar el elemento card más cercano y removerlo del DOM
      const card = checkbox.closest('.card');
      if (card) {
        card.remove();
      }
    } else {
      // Mostrar un mensaje si la casilla no está marcada
      alert("Tienes que confirmar la oblea");
    }
  }
  

