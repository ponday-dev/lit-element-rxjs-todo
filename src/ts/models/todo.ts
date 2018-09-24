export interface Todo {
    id: number;
    value: string;
    isCompleted: boolean;
}

export type TodoFactory = (value: string) => Todo;

export function createTodoFactory(): TodoFactory {
    const idGenerator = generateId();
    return (value: string) => {
        return {
            id: idGenerator.next().value,
            value,
            isCompleted: false
        };
    }
}

function* generateId(): IterableIterator<number> {
    for(let i = 1; true; i++) {
        yield i;
    }
}
