import { ActionType, TodoAction, TodoState, TodoItem } from "../models/models";

export default (state: TodoState, action: TodoAction) => {
    const { type, payload } = action;

    console.log(type, payload);

    switch (type) {
        case ActionType.FETCH_TODOS_REQUEST:
            return { ...state, loading: true };
        case ActionType.FETCH_TODOS_RESPONSE:
            return {
                ...state,
                loading: false,
                items: !payload.hasError ? payload.items : [],
                selectedCount: 0, // Fetch all items happens only once on app start, so no items are selected at that time
                error: payload.hasError ? payload.error : undefined
            };
        case ActionType.CREATE_TODO_REQUEST:
            return { ...state, loading: true };
        case ActionType.CREATE_TODO_RESPONSE:
            return {
                ...state,
                loading: false,
                items: !payload.hasError
                    ? [...state.items, payload.createdItem]
                    : [],
                error: payload.hasError ? payload.error : undefined
            };
        case ActionType.UPDATE_TODO_REQUEST:
            return { ...state };
        case ActionType.UPDATE_TODO_RESPONSE:
            return { ...state };
        case ActionType.DELETE_TODO_REQUEST:
            return { ...state, loading: true };
        case ActionType.DELETE_TODO_RESPONSE:
            return {
                ...state,
                loading: false,
                items: !payload.hasError ? payload.items : [],
                error: payload.hasError ? payload.error : undefined
            };
        case ActionType.BATCH_DELETE_TODOS_REQUEST:
            return { ...state, loading: true };
        case ActionType.BATCH_DELETE_TODOS_RESPONSE:
            return {
                ...state,
                loading: false,
                items: !payload.hasError ? payload.items : [],
                error: payload.hasError ? payload.error : undefined
            };
        case ActionType.TOGGLE_SELECTED:
            return {
                ...state,
                items: payload.items,
                selectedCount: payload.selectedCount
            };
        case ActionType.TOGGLE_ALL_SELECTED:
            return {
                ...state,
                items: payload.items,
                selectedCount: payload.selectedCount
            };
        default:
            return state;
    }
};
