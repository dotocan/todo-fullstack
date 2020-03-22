import { ActionType, TodoAction, TodoState } from "../models/models";

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
                filteredItems: !payload.hasError ? payload.items : [],
                error: payload.hasError ? payload.error : undefined
            };

        case ActionType.CREATE_TODO_REQUEST:
            return { ...state, loading: true };
        case ActionType.CREATE_TODO_RESPONSE:
            return {
                ...state,
                loading: false,
                items: !payload.hasError ? payload.items : [],
                filteredItems: !payload.hasError ? payload.filteredItems : [],
                error: payload.hasError ? payload.error : undefined
            };

        case ActionType.UPDATE_TODO_REQUEST:
            return { ...state, loading: true };
        case ActionType.UPDATE_TODO_RESPONSE:
            return {
                ...state,
                loading: false,
                items: !payload.hasError ? payload.items : [],
                filteredItems: !payload.hasError ? payload.filteredItems : [],
                error: payload.hasError ? payload.error : undefined
            };

        case ActionType.DELETE_TODO_REQUEST:
            return { ...state, loading: true };
        case ActionType.DELETE_TODO_RESPONSE:
            return {
                ...state,
                loading: false,
                items: !payload.hasError ? payload.items : [],
                filteredItems: !payload.hasError ? payload.filteredItems : [],
                selectedCount: !payload.hasError ? payload.selectedCount : 0,
                error: payload.hasError ? payload.error : undefined
            };

        case ActionType.BATCH_DELETE_TODOS_REQUEST:
            return { ...state, loading: true };
        case ActionType.BATCH_DELETE_TODOS_RESPONSE:
            return {
                ...state,
                loading: false,
                items: !payload.hasError ? payload.items : [],
                filteredItems: !payload.hasError ? payload.filteredItems : [],
                selectedCount: !payload.hasError ? payload.selectedCount : 0,
                error: payload.hasError ? payload.error : undefined
            };

        case ActionType.TOGGLE_SELECTED:
            return {
                ...state,
                items: payload.items,
                filteredItems: payload.filteredItems,
                selectedCount: payload.selectedCount
            };

        case ActionType.TOGGLE_ALL_SELECTED:
            return {
                ...state,
                items: payload.items,
                filteredItems: payload.filteredItems,
                selectedCount: payload.selectedCount
            };

        case ActionType.GET_ITEM_DETAILS:
            return {
                ...state,
                details: !payload.hasError ? payload.details : null,
                error: payload.hasError ? payload.error : undefined
            };

        case ActionType.CHANGE_PAGE: {
            return {
                ...state,
                currentPage: payload.currentPage
            };
        }

        case ActionType.ON_CHANGE_FILTER: {
            return {
                ...state,
                filter: payload.filter,
                filteredItems: payload.filteredItems,
                selectedCount: payload.selectedCount
            };
        }

        case ActionType.ON_CHANGE_SEARCH_QUERY: {
            return {
                ...state,
                searchQuery: payload.searchQuery,
                filteredItems: payload.filteredItems,
                selectedCount: payload.selectedCount
            };
        }

        default:
            return state;
    }
};
