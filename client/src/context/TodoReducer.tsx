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
                items: !hasError(payload) ? payload : [],
                error: hasError(payload) ? payload.error : undefined
            };
        case ActionType.CREATE_TODO_REQUEST:
            return { ...state, loading: true };
        case ActionType.CREATE_TODO_RESPONSE:
            return {
                ...state,
                loading: false,
                items: !hasError(payload) ? [...state.items, payload] : [],
                error: hasError(payload) ? payload.error : undefined
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
                items: !hasError(payload)
                    ? removeDeletedItemFromArray(payload, state.items)
                    : [],
                error: hasError(payload) ? payload.error : undefined
            };
        case ActionType.BATCH_DELETE_TODOS_REQUEST:
            return { ...state, loading: true };
        case ActionType.BATCH_DELETE_TODOS_RESPONSE:
            return {
                ...state,
                loading: false,
                items: !hasError(payload)
                    ? removeDeletedItemsFromArray(payload, state.items)
                    : [],
                error: hasError(payload) ? payload.error : undefined
            };
        case ActionType.TOGGLE_SELECTED:
            return {
                ...state,
                items: toggleSelected(action.payload as TodoItem, state.items)
            };
        case ActionType.COUNT_SELECTED:
            return {
                ...state,
                selectedCount: countSelected(state.items)
            };
        default:
            return state;
    }
};

const hasError = (payload: any) => {
    if (payload.error) {
        return true;
    }

    return false;
};

const removeDeletedItemFromArray = (
    deletedItem: TodoItem,
    items: TodoItem[]
): TodoItem[] => {
    return items.filter((item: TodoItem) => {
        return item.id !== deletedItem.id;
    });
};

const removeDeletedItemsFromArray = (
    deletedItems: TodoItem[],
    items: TodoItem[]
): TodoItem[] => {
    const removedIds = deletedItems.map((deletedItem: TodoItem) => {
        return deletedItem.id;
    });

    return items.filter((item: TodoItem) => {
        // Return items that don't have same id as deleted items
        return !removedIds.includes(item.id);
    });
};

const toggleSelected = (itemToToggle: TodoItem, items: TodoItem[]) => {
    return items.map((item: TodoItem) => {
        if (item.id === itemToToggle.id) {
            item.selected = !item.selected;
        }

        return item;
    });
};

const countSelected = (items: TodoItem[]) => {
    let count = 0;
    items.forEach((item: TodoItem) => {
        if (item.selected) count++;
    });

    return count;
};
