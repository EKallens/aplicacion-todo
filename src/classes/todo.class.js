
export class Todo {

    static fromJson({ tarea, id, completado, fechaCreacion }){
        const nuevoTodo = new Todo( tarea );

        nuevoTodo.id            = id;
        nuevoTodo.completado    = completado;
        nuevoTodo.fechaCreacion = fechaCreacion;

        return nuevoTodo;
    }

    constructor( tarea ){
        this.tarea = tarea;

        this.id             = new Date().getTime();
        this.completado     = false;
        this.fechaCreacion  = new Date();
    }

}