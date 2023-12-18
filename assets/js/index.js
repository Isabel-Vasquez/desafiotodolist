// Obtención de elementos del DOM:
const inputTask = document.getElementById('input-task');
const button = document.getElementById('button');
const lista = document.getElementById('lista_productos');

// Definición del array de productos:
let productos = [
	{
		id: 1,
		nombre: 'hacer mercado',
		complete: false,
	},
	{
		id: 2,
		nombre: 'estudiar para la prueba',
		complete: false,
	},
	{
		id: 3,
		nombre: 'sacar a pasear a tobby',
		complete: false,
	},
];

function actualizarContadores() {
	const totalTareas = productos.length;
	const tareasCompletadas = productos.filter((tarea) => tarea.complete).length;

	document.getElementById('contador').innerText = totalTareas;
	document.getElementById('hecho').innerText = tareasCompletadas;
}

function agregarTarea() {
	const nuevaTarea = inputTask.value.trim();
	if (nuevaTarea !== '') {
		const maxId = productos.reduce(
			(max, tarea) => (tarea.id > max ? tarea.id : max),
			0,
		);

		const nuevaTareaObj = {
			id: maxId + 1,
			nombre: nuevaTarea,
			complete: false,
		};

		productos.push(nuevaTareaObj);
		mostarProductos();
		inputTask.value = '';
		actualizarContadores();
	}
}

function eliminarTarea(id) {
	// Filtrar el array y reasignar los IDs
	productos = productos
		.filter((tarea) => tarea.id !== id)
		.map((tarea, index) => ({ ...tarea, id: index + 1 }));
	mostarProductos();
	actualizarContadores();
	console.log(productos);
}

function eliminarTarea(id) {
	productos = productos.filter((tarea) => tarea.id !== id);
	mostarProductos();
	actualizarContadores();
	console.log(productos);
}

function marcarComoCompletada(id) {
	const tarea = productos.find((t) => t.id === id);
	if (tarea) {
		tarea.complete = !tarea.complete;
		mostarProductos();
		actualizarContadores();
	}
}

function mostarProductos() {
	let htmlContainer = '';
	productos.forEach((element) => {
		const li = `<li class="${element.complete ? 'completed' : ''}">
      <span class="element-id">${element.id}</span> 
      <span class="task-name ${element.complete ? 'completed' : ''}">
        ${element.nombre}
      </span>
      <input type="checkbox" id="${element.id}" ${
			element.complete ? 'checked' : ''
		} onchange="marcarComoCompletada(${element.id})">
      <button onclick="eliminarTarea(${element.id})">
        <i class="fas fa-trash-alt"></i>
      </button>
    </li>`;

		htmlContainer += li;
	});

	lista.innerHTML = htmlContainer;
}

button.addEventListener('click', agregarTarea);

mostarProductos();
actualizarContadores();
