
// ----> CREADOR DE USUARIOS <---- \\

class Usuario {
    constructor (info) {
    this.nombre = info.nombre;
    this.apellido = info.apellido;
    this.edad = info.edad;
    this.altura = info.altura;
    this.fechaNacimiento = info.fechaNacimiento;
    this.pesoInicial = info.pesoInicial;
    this.correo = info.correo;
    this.rutina = info.rutina;
    this.inscripto = false;

    }

       inscribir(usuarios) {
        this.inscripto = true;
        this.id = usuarios.length + 1;
        usuarios.push(this);
    }
};


// ARRAY \\ 
const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

// USUARIOS INSCRIPTOS\\

/* 
 Luego me gustaria que estos usuarios puedan ser ingresados por un form. --------> // PENDIENTE \\ <----------
*/

// Función para obtener las rutinas mediante fetch
const obtenerRutinas = async () => {
    try {
        const response = await fetch("./rutines.json");
        const data = await response.json();

        // Aseguramos que data sea un array
        return Array.isArray(data) ? data : [];
    } catch (error) {
        console.error("Error al obtener las rutinas:", error);
        return [];
    }
};



// ENVIO DE LOS USUARIOS AL LOCALSTORAGE \\

const usuariosLocalStorage = localStorage.getItem("usuarios");

!usuariosLocalStorage && localStorage.setItem("usuarios", JSON.stringify(usuarios));

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const boxUsuarios = document.getElementById("boxUsuarios");

const traerRutines = async() => {
    const response = await fetch("./rutines.json");
    const data = await response.json();

    data.forEach(rutine => {
        const div = document.createElement("div");
        div.innerHTML = `<h2>${rutine.nombre} </h2>`;

        const ejerciciosP = document.createElement("p");

        Object.keys(rutine.ejercicios).forEach(ejercicioKey => {
            const ejercicio = rutine.ejercicios[ejercicioKey];
            ejerciciosP.innerHTML += `
            <strong>${ejercicio.nombre}</strong><br>
            Series: ${ejercicio.series}<br>
            Tiempo: ${ejercicio.tiempo}<br>
            Peso: ${ejercicio.peso}<br>
            Nota: ${ejercicio.nota}<br><br>
            
            `;
        });


        boxUsuarios.append(div);
        div.appendChild(ejerciciosP);
    
    });

};

// traerRutines();


//// FORMULARIO \\\

const submitBtn = document.getElementById("submit");
const resetBtn = document.getElementById("reset");
const form = document.getElementById("form");

form.addEventListener("submit", (e) => {
    e.preventDefault();
});


resetBtn.addEventListener("click", (e) => {

    let name = document.getElementById("name");
    let surname = document.getElementById("surname");
    let age = document.getElementById("age");
    let bornDate = document.getElementById("bornDate");
    let email = document.getElementById("email");
    let height = document.getElementById("height");
    let weigth = document.getElementById("weigth");
    let grupoSangre = document.getElementById("grupoSangre");
    let rutines = document.getElementById("rutines");

    name.value = "";
    surname.value = "";
    age.value = "";
    bornDate.value = "";
    email.value = "";
    height.value = "";
    weigth.value = "";
    grupoSangre.value = "";
    rutines.value = "";

});

submitBtn.addEventListener("click", () => {
    let usuarioJson = localStorage.getItem("usuarios");
    let usuarios = JSON.parse(usuarioJson);

    let name = document.getElementById("name").value;
    let surname = document.getElementById("surname").value;
    let age = document.getElementById("age").value;
    let bornDate = document.getElementById("bornDate").value;
    let email = document.getElementById("email").value;
    let height = document.getElementById("height").value;
    let weigth = document.getElementById("weigth").value;
    let grupoSangre = document.getElementById("grupoSangre").value;
    let rutinaNombre = document.getElementById("rutines").value;

    // Validaciones\\

    if (!name || !surname || !age || !bornDate || !email || !height || !weigth || !grupoSangre || !rutines) {
        alert("Por favor, complete todos los campos del formulario.");
        return;
    }

    const fechaHoy = new Date();
    const fechaIngresada = new Date(bornDate);
    if (fechaIngresada > fechaHoy) {
        alert("La fecha de nacimiento no puede estar en el futuro.");
        return;
    }

    if (isNaN(parseFloat(weigth)) || isNaN(parseFloat(height))) {

        alert("Por favor, ingrese números válidos en los campos de peso e altura.");
        return;
    }

    const traerRutines = async () => {
        const response = await fetch("./rutines.json");
        const data = await response.json();

        let rutinaSeleccionada = data.find(rutina => rutina.nombre === rutinaNombre);

        if (rutinaSeleccionada) {

            const newUser = {
                nombre: name,
                apellido: surname,
                edad: age,
                fechaNacimiento: bornDate,
                correo: email,
                altura: height,
                pesoInicial: weigth,
                grupoSangre: grupoSangre,
                rutina: rutinaSeleccionada,
            }

        usuarios.push(newUser);
        localStorage.setItem("usuarios", JSON.stringify(usuarios));
        location.reload();
        
        } else {
            console.log("Error");
        }
    }

traerRutines();

Swal.fire({
    title: '¡Bienvenido!',
    text: 'Has sido inscripto',
    icon: 'success',
    confirmButtonText: 'Aceptar'
  });
   
});


// ----> LISTA DE NOMBRES AL HTML <----- \\

const nombresUsuarioStorage = localStorage.getItem("usuarios");
const usuariosGuardados = JSON.parse(nombresUsuarioStorage);

//----> CONTADOR DE USUARIOS <---- \\

const contadorUsuarios = usuariosGuardados.length;

const contador = document.getElementById("contador");
contador.innerHTML = contadorUsuarios;
contador.className = "counter";
document.body.append;

const listaNombres = document.querySelector("#list");
listaNombres.innerHTML = ""; // Limpia la lista existente

usuariosGuardados.forEach((usuario, index) => {
    const listaUsuarios = document.createElement("div");
    listaUsuarios.innerHTML = ` 
        <p>Nombre: ${usuario.nombre}</p>
        <p>Apellido: ${usuario.apellido}</p>
        <p>Edad: ${usuario.edad}</p>
        <button type="button" class="btn btn-danger btn-sm btnEliminar" data-index="${index}">Eliminar</button>
    `;
    listaUsuarios.classList.add("d-flex", "flex-column", "mb-3", "fs-6", "lista");
    listaNombres.append(listaUsuarios);
});


document.querySelectorAll(".btnEliminar").forEach( (btn) => {
    btn.addEventListener("click", function() {
        // Obtener el índice almacenado en el atributo data
        const index = this.getAttribute("data-index");
        
        // Eliminar el usuario del array usuariosGuardados
        usuariosGuardados.splice(index, 1);
        
        // Actualizar el local storage
        localStorage.setItem('usuarios', JSON.stringify(usuariosGuardados));

        // Recargar la página
        location.reload();
    });
});


function buscar() {
    let usuarioJson = localStorage.getItem("usuarios");
    let usuarios = JSON.parse(usuarioJson);

    let usuarioBuscado = document.getElementById("buscador").value;

    if (usuarioBuscado.trim() === "") {
        alert("Ingrese un nombre de usuario válido");
        return;
    }

    let usuarioEncontrado = usuarios.find((user) => user.nombre.toUpperCase() === usuarioBuscado.toUpperCase());

    if (usuarioEncontrado) {
        let div2 = document.getElementById("boxListaBusqueda");

        div2.innerHTML = `
            <div class="card" id="cardUsuario" style="width: 18rem;">
                <div class="card-body">
                    <h5 class="card-title">${usuarioEncontrado.nombre} ${usuarioEncontrado.apellido}</h5>
                    <h6 class="card-subtitle mb-2 text-body-secondary">Edad: ${usuarioEncontrado.edad}</h6>
                    <h6 class="card-subtitle mb-2 text-body-secondary">Estatura: ${usuarioEncontrado.altura}</h6>
                    <p class="card-text">Peso: ${usuarioEncontrado.pesoInicial}</p>
                    <p class="card-text">Rutina: ${usuarioEncontrado.rutina.nombre}</p>
                    <button type="button" id="btnReinicio" class="btn btn-secondary btnReinicio">Reiniciar</button>
                </div>
            </div>
        `;
        document.body.append(div2);
    } else {
        alert("El usuario no existe");
    }
}

const boton = document.createElement("button");
boton.addEventListener("click", buscar);
boton.innerHTML = "Buscar Usuario";
document.querySelector("#boton").append(boton);


const botonReinicio = document.querySelector("#btnReinicio");

document.body.addEventListener("click", (event) => {
    if (event.target.classList.contains("btnReinicio")) {
        const div2 = document.getElementById("boxListaBusqueda");
        div2.innerHTML = "";
        location.reload();
    }
});