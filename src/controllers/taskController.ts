import {Elysia} from 'elysia';

export const taskController = (app: Elysia) => 
    app.get('/', () => {
        return 'Hello World';
    })
    .get('/tasks', () => {
        return 'Tasks';
    })