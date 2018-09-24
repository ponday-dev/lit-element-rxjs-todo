import { LitElement, html, property } from '@polymer/lit-element';
import { Todo } from '../models/todo';

export class TodoList extends LitElement {

    @property()
    todoList: Todo[] = [];

    constructor() {
        super();
        this.handleToggle = this.handleToggle.bind(this);
        this.handleClickDelete = this.handleClickDelete.bind(this);
    }

    render() {
        return html`
        <style>
        ul {
            list-style: none;
            margin: 1rem 0;
            padding: 0;
        }
        li {
            display: flex;
            align-items: center;
            flex-direction: row;
            padding: 1rem 0.5rem;
        }
        li:not(:nth-last-child(1)) {
            border-bottom: 1px solid #e7e7e7;
        }
        li > div {
            flex: 1 1 auto;
            padding: 0 1rem;
        }
        li.completed > div {
            color: #e0e0e0;
        }
        .delete {
            outline: none;
            color: #9e2238;
            border: none;
        }
        .delete:hover {
            color: #e81632;
        }
        </style>
        <ul>
        ${this.todoList.map((todo, index) => html`
            <li id="todo-item-${ todo.id }" class="${ todo.isCompleted ? 'completed' : '' }">
                <input type="checkbox" .checked="${todo.isCompleted}" @change="${(e) => this.handleToggle(todo, !todo.isCompleted)}">
                <div>${todo.value}</div>
                <button type="button" class="delete" @click="${e => this.handleClickDelete(todo) }">delete</button>
            </li>
        `)}
        </ul>
        `;
    }

    handleToggle(todo: Todo, value: boolean) {
        const event = new CustomEvent('toggleItem', { detail: { target: todo, value }});
        this.dispatchEvent(event);
    }
    handleClickDelete(todo: Todo) {
        const event = new CustomEvent('delete', { detail: { target: todo }});
        this.dispatchEvent(event);
    }
}
