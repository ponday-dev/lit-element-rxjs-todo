import { LitElement, html } from '@polymer/lit-element';
import { Store } from '@/store';
import { store, State, CREATE_TODO, COMPLETE_TODO, RESET_TODO, DELETE_TODO } from '@/state';
import { Todo } from '@/models/todo';
import { Subscription } from 'rxjs';

function connect(store: Store<State>) {
    return (baseElement) => class extends baseElement {
        private subscription: Subscription;
        protected store = store;

        connectedCallback() {
            this.subscription = this.store.$.subscribe(state => this.requestUpdate());
        }

        disconnectedCallback() {
            this.subscription.unsubscribe();
        }
    }
}

export class MyApp extends connect(store)(LitElement) {

    render() {
        return html`
        <style>
        .container {
            width: 80vw;
        }
        </style>
        <div class="container">
            <todo-input @add="${this.handleAdd.bind(this)}"></todo-input>
            <todo-list
                .todoList=${this.store.value.todo}
                @toggleItem="${this.handleToggleItem.bind(this)}"
                @delete="${this.handleDelete.bind(this)}"
            ></todo-list>
        </div>
        `;
    }

    handleAdd(event: CustomEventInit<{ value: string }>) {
        this.store.commit(CREATE_TODO, event.detail.value);
    }
    handleToggleItem(event: CustomEventInit<{ target: Todo, value: boolean }>) {
        const { target: { id }, value } = event.detail;
        if (value) {
            this.store.commit(COMPLETE_TODO, id);
        } else {
            this.store.commit(RESET_TODO, id);
        }
    }
    handleDelete(event: CustomEvent<{ target: Todo }>) {
        this.store.commit(DELETE_TODO, event.detail.target.id);
    }

}
