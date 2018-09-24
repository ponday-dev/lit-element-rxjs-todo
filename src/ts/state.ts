import { Todo } from '@/models/todo';
import { createTodoFactory } from '@/models/todo';
import { Store } from '@/store';

export const CREATE_TODO = 'CREATE_TODO';
export const DELETE_TODO = 'DELETE_TODO';
export const COMPLETE_TODO = 'COMPLETE_TODO';
export const RESET_TODO = 'RESET_TODO';

export interface State {
    todo: Todo[];
}

const state = { todo: [] };

const createTodo = createTodoFactory();

const mutations = {
    [CREATE_TODO]: (state: State, value: string) => {
        return Object.assign(state, {
            todo: state.todo.concat(createTodo(value))
        });
    },
    [DELETE_TODO]: (state: State, id: number) => {
        return Object.assign(state, {
            todo: state.todo.filter(state => state.id !== id)
        });
    },
    [COMPLETE_TODO]: (state: State, id: number) => {
        return Object.assign(state, {
            todo: state.todo.map(todo => {
                if (todo.id === id) {
                    return Object.assign({}, todo, { isCompleted: true });
                } else {
                    return todo;
                }
            })
        });
    },
    [RESET_TODO]: (state: State, id: number) => {
        return Object.assign(state, {
            todo: state.todo.map(todo => {
                if (todo.id === id) {
                    return Object.assign({}, todo, { isCompleted: false });
                } else {
                    return todo;
                }
            })
        });
    }
};

export const store = new Store<State>({ state, mutations });
