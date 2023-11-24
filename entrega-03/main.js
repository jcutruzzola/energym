
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

new Usuario ({

    nombre: "Norman",
    apellido: "Parra",
    edad: 21,
    altura: "1.79",
    fechaNacimiento: "6-Jan-94",
    pesoInicial: 70,
    correo: "normanparra@gmail.com",

}).inscribir(usuarios);

new Usuario ({

    nombre: "Maximiliano",
    apellido: "Soto",
    edad: 22,
    altura: "1.87",
    fechaNacimiento: "19-Oct-93",
    pesoInicial: 108,
    correo: "maxisoto@gmail.com",
                    
 }).inscribir(usuarios);

new Usuario ({
    nombre: "César",
    apellido: "Villareal",
    edad: 25,
    altura: "1.85",
    fechaNacimiento: "26-Dec-90",
    pesoInicial: 92,
    correo: "cesarvillarreal@gmail.com",
        
}).inscribir(usuarios);

new Usuario ({
    nombre: "Irving",
    apellido: "fierro",
    edad: 24,
    altura: "1.80",
    fechaNacimiento: "30-Oct-91",
    pesoInicial: 97,
    correo: "irvingfierro@gmail.com",
            
}).inscribir(usuarios);

new Usuario ({
    nombre: "Juan",
    apellido: "Flores",
    edad: 25,
    altura: "1.73",
    fechaNacimiento: "18-Nov-90",
    pesoInicial: 91,
    correo: "juanflores@gmail.com",
                
}).inscribir(usuarios);


// ENVIO DE LOS USUARIOS AL LOCALSTORAGE \\

// localStorage.setItem("usuarios", JSON.stringify(usuarios))


const usuariosLocalStorage = localStorage.getItem("usuarios");

!usuariosLocalStorage && localStorage.setItem("usuarios", JSON.stringify(usuarios));

// if (!usuariosLocalStorage) {
//   localStorage.setItem("usuarios", JSON.stringify(usuarios));
// }


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const prueba = document.getElementById("prueba");

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


        prueba.append(div);
        div.appendChild(ejerciciosP);
    
    });

};

// traerRutines();


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


///////////////////////////////////////////////////////////\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

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
        // inscribir(usuarios);
        usuarios.push(newUser);
        localStorage.setItem("usuarios", JSON.stringify(usuarios));
        
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


///////////////////////////////////////////////////////////\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

// ----> INGRESAR NUEVO USUARIO POR PROMPT <-----  \\

/* const crearUsuario = () => {
    let usuarioJson = localStorage.getItem("usuarios");
    let usuarios = JSON.parse(usuarioJson);

    let nombre = prompt("Ingrese el nombre del usuario");
    let apellido = prompt("Ingrese el apellido del usuario");
    let edad = Number(prompt("Ingrese la edad del usuario"));
    let altura = Number(prompt("Ingrese la altura del usuario"));
    let fechaNacimiento = prompt("Ingrese fecha de nacimiento formato DD/MM/AA");
    let pesoInicial = Number(prompt("Ingrese peso"));
    let correo = prompt("Ingrese correo electrónico");


    let nuevoUsuario = new Usuario ({
        nombre,
        apellido,
        edad,
        altura,
        fechaNacimiento,
        pesoInicial,
        correo,
    }).inscribir(usuarios);


    // usuarios.push(nuevoUsuario); // el método del constructor ya hace el push.

    localStorage.setItem("usuarios", JSON.stringify(usuarios));
};
 */

// -----> BOTON PARA CREAR USUARIOS - YA NO ES NECESARIO <----- \\   

/* let botonCrearUsuario = document.createElement("button");
botonCrearUsuario.addEventListener("click", (info) => crearUsuario(info));

botonCrearUsuario.innerHTML = "Crear Usuario";
document.getElementById("botonUsuario").append(botonCrearUsuario);
 */
// ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



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

usuariosGuardados.forEach((usuario) => {
    const listaUsuarios = document.createElement("li");
    listaUsuarios.innerHTML = usuario.nombre;
    listaUsuarios.className = "lista";
    listaNombres.append(listaUsuarios);
});


// BÚSQUEDA DE USUARIOS \

function buscar() {

    let nombre = prompt("Ingrese el nombre de usuario que desea conocer los datos, para salir ingrese SALIR");

    while(nombre.toUpperCase() !== null) {

        if (nombre.toUpperCase() === "SALIR") {
            // Si el usuario ingresa "SALIR", salir del bucle
            break;
        }


        let usuario;

            for (const item of usuarios) {
                if(item.nombre.toUpperCase() === nombre.toUpperCase()){
                    usuario = item;
                }
            }

            if (usuario) {

                let div2 = document.getElementById("prueba2");

                div2.innerHTML = `
                <div class="card" style="width: 18rem;">
                    <div class="card-body">
                        <h5 class="card-title">${usuario.nombre}</h5>
                        <h6 class="card-subtitle mb-2 text-body-secondary">Edad: ${usuario.edad}</h6>
                        <h6 class="card-subtitle mb-2 text-body-secondary">Estatura: ${usuario.altura}</h6>
                        <p class="card-text">Peso: ${usuario.pesoInicial}</p>
                    </div>
                </div>
              `;
                document.body.append(div2);

            } else {
                alert("El usuario no existe");
            }

        nombre = prompt("Ingrese el nombre de usuario que desea conocer los datos, para salir ingrese SALIR");
    }
};

const boton = document.createElement("button");
boton.addEventListener("click", buscar);

boton.innerHTML = "Buscar Usuario";
document.querySelector("#boton").append(boton);




