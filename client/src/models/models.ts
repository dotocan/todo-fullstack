export interface TodoItem {
    id: string | number;
    title: string;
    description?: string;
    completed: boolean;
    created?: Date;
    selected: boolean;
}

export interface TodoItemToCreate {
    title: string;
    description: string;
}

export interface TodoState {
    items: TodoItem[];
    selectedCount: number;
    loading: boolean;
    error?: TodoError;

    fetchAll: () => void;
    createTodo: (item: TodoItemToCreate) => void;
    deleteTodo: (item: TodoItem) => void;
    batchDeleteTodos: () => void;
    toggleSelected: (item: TodoItem) => void;
}

export interface TodoAction {
    type: ActionType;
    payload?: any;
}

export interface TodoError {
    description: string;
    details?: any;
}

export interface TextFieldValidation {
    error: boolean;
    helperText?: string;
}

export enum ActionType {
    FETCH_TODOS_REQUEST = "FETCH_TODOS_REQUEST",
    FETCH_TODOS_RESPONSE = "FETCH_TODOS_RESPONSE ",
    CREATE_TODO_REQUEST = "CREATE_TODO_REQUEST ",
    CREATE_TODO_RESPONSE = "CREATE_TODO_RESPONSE ",
    UPDATE_TODO_REQUEST = "UPDATE_TODO_REQUEST ",
    UPDATE_TODO_RESPONSE = "UPDATE_TODO_RESPONSE ",
    DELETE_TODO_REQUEST = "DELETE_TODO_REQUEST",
    DELETE_TODO_RESPONSE = "DELETE_TODO_RESPONSE",
    BATCH_DELETE_TODOS_REQUEST = "BATCH_DELETE_TODOS_REQUEST",
    BATCH_DELETE_TODOS_RESPONSE = "BATCH_DELETE_TODOS_RESPONSE",
    TOGGLE_SELECTED = "TOGGLE_SELECTED",
    COUNT_SELECTED = "COUNT_SELECTED"
}
