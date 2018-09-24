import { BehaviorSubject, Observable } from 'rxjs';
import cloneDeep from 'lodash-es/cloneDeep';

export class ActionContext<T> {
    constructor(private store: Store<T>) { }

    commit(key: string, payload?: any): T {
        return this.store.commit(key, payload);
    }
};
export type Mutation<T> = (state: T, payload?: any) => T;
export type Action<T> = (context: ActionContext<T>, payload?: any) => T;

export class Store<T> {

    private _store: BehaviorSubject<T>;
    private mutations: { [key: string]: Mutation<T> };
    private actions: { [key: string]: Action<T> };

    constructor(opts: {
        state: T,
        mutations: { [key: string]: Mutation<T> },
        actions?: { [key: string]: Action<T> }
    }) {
        this._store = new BehaviorSubject<T>(opts.state);
        this.mutations = opts.mutations;
        this.actions = opts.actions || {};
    }

    get $(): Observable<T> {
        return this._store.asObservable();
    }

    get value(): T {
        return cloneDeep(this._store.value);
    }

    dispatch(key: string, payload?: any): Promise<T> {
        return new Promise<T>((resolve, reject) => {
            try {
                resolve(this.actions[key](new ActionContext<T>(this), payload));
            } catch(e) {
                reject(e);
            }
        });
    }

    commit(key: string, payload?: any): T {
        const newState = this.mutations[key](cloneDeep(this._store.value), payload);
        this._store.next(newState);
        return newState;
    }
}
