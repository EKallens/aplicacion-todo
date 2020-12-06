import { Todo } from '../classes';
import { todoList } from '../index';


//Referencia a elementos HTML
const divTodoList          = document.querySelector('.todo-list');
const txtInput             = document.querySelector('.new-todo');
const ulFiltros            = document.querySelector('.filters');
const anchorFiltros        = document.querySelectorAll('.filtro');
const totalPendientes      = document.querySelector('.todo-count');

//Funciones
export const crearTodoHtml = ( todo ) => {

    calcularPendientes();

    const todoHtml = `
    <li class="${ (todo.completado) ? ' completed' : '' }" data-id="${todo.id}">
		<div class="view">
			<input class="toggle" type="checkbox" ${ (todo.completado) ? 'checked' : '' }>
			<label>${ todo.tarea }</label>
			<button class="destroy"></button>
		</div>
		<input class="edit" value="Create a TodoMVC template">
	</li>
    `;

    const div = document.createElement('div');
    div.innerHTML = todoHtml;
    divTodoList.append(div.firstElementChild);

    return div.firstElementChild;
}


const calcularPendientes = () => {

    let total = todoList.calcularPendientes();
    totalPendientes.firstElementChild.innerText = total;
}

//Eventos

txtInput.addEventListener('keyup', (event) => {

    if(event.keyCode == 13 && txtInput.value.length > 0){

        const nuevoTodo = new Todo(txtInput.value);
        todoList.crearTodo( nuevoTodo );
        crearTodoHtml( nuevoTodo );
        txtInput.value = '';
        calcularPendientes();
    }
});

divTodoList.addEventListener('click', (event) => {

    const nombreElemento = event.target.localName;
    const todoElemento   = event.target.parentElement.parentElement;
    const idElemento     = todoElemento.getAttribute('data-id');

    switch(nombreElemento){
        case 'input': 
                    todoList.cambiarEstado( idElemento );
                    todoElemento.classList.toggle('completed');
                    calcularPendientes();
        break;
        case 'button': 
                    todoList.eliminarTodo( idElemento );
                    divTodoList.removeChild( todoElemento );
                    calcularPendientes();
        break;
    }

});


ulFiltros.addEventListener('click', (event) => {
    const filtro = event.target.text;

    if( !filtro ){ return; }

    anchorFiltros.forEach( elem => {
        elem.classList.remove('selected');
    });

    event.target.classList.add('selected');

    for (const liTodo of divTodoList.children) {

        liTodo.classList.remove('hidden');
        const completado = liTodo.classList.contains('completed');

        switch( filtro ){
            case 'Pendientes':
                if(completado){
                    liTodo.classList.add('hidden');
                }
            break;
            case 'Completados':
                if(!completado){
                    liTodo.classList.add('hidden');
                }
            break;
        }
    }
});