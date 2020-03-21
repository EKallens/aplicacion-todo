import { Todo } from './todo.class';

export class TodoList {

    constructor(){
        this.cargarLocalStorage();
        this.calcularPendientes();
    }

    crearTodo( todo ){
        this.todos.push( todo );
        this.guardarLocalStorage();
    }

    eliminarTodo( id ){

        this.todos = this.todos.filter( todo => todo.id != id);
        this.guardarLocalStorage();
    }

    cambiarEstado( id ){

        for (const todo of this.todos) {
            if (todo.id == id) {
                todo.completado = !todo.completado;
            }
        }
        this.guardarLocalStorage();
    }

    borrarCompletados(){
        this.todos = this.todos.filter( todo => !todo.completado);
        this.guardarLocalStorage();
    }

    guardarLocalStorage(){
        localStorage.setItem('todos', JSON.stringify(this.todos));
    }

    cargarLocalStorage(){
        this.todos = (localStorage.getItem('todos') ? JSON.parse(localStorage.getItem('todos')) : []);

        if(this.todos.length > 0){
            // this.todos = this.todos.map( ( obj ) => Todo.fromJson( obj ) );

            // Esto es lo mismo que lo de arriba que está comentado [Si la función recibe solo un paramétro se puede omitir ya que siempre envía el primer parametro de la arrow]
            this.todos = this.todos.map( Todo.fromJson );
        }
    }

    calcularPendientes(){
        let totalPendientes = this.todos.filter( (todo) => !todo.completado);
        console.log(totalPendientes.length);
        return totalPendientes.length;
    }

}