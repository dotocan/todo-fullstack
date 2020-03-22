import React, { createContext, useReducer } from "react";
import TodoReducer from "./TodoReducer";
import {
    TodoItem,
    TodoState,
    ActionType,
    TodoItemToCreate,
    Filter
} from "../models/models";
import axios from "axios";
import {
    doToggleSelected,
    countSelected,
    doToggleAllSelected,
    removeDeletedItemFromArray,
    removeDeletedItemsFromArray,
    updateTodoInItems,
    filterAndSearch
} from "./helperMethods";

const initialState: TodoState = {
    items: [] as TodoItem[],
    filteredItems: [] as TodoItem[],
    selectedCount: 0,
    itemsPerPage: 5,
    currentPage: 1,
    filter: Filter.ALL,
    searchQuery: "",
    loading: false,
    error: undefined,

    fetchAll: () => {},
    createTodo: (item: TodoItemToCreate) => {},
    updateTodo: (item: TodoItem) => {},
    deleteTodo: (item: TodoItem) => {},
    batchDeleteTodos: () => {},
    toggleSelected: (item: TodoItem) => {},
    toggleAllSelected: () => {},
    getItemDetails: (id: string | number) => {},
    goToPage: (page: number) => {},
    onChangeFilter: (filter: Filter) => {},
    onChangeSearchQuery: (searchQuery: string) => {}
};

const rootApiUrl = "http://localhost:8080";

export const TodoContext = createContext(initialState);

export const TodoProvider: React.FC = (props: any) => {
    const [state, dispatch] = useReducer(TodoReducer, initialState);

    const fetchAll = async () => {
        dispatch({ type: ActionType.FETCH_TODOS_REQUEST });

        try {
            const response = await axios.get(`${rootApiUrl}/items`);
            dispatch({
                type: ActionType.FETCH_TODOS_RESPONSE,
                payload: { items: response.data, hasError: false }
            });
        } catch (error) {
            dispatch({
                type: ActionType.FETCH_TODOS_RESPONSE,
                payload: { hasError: true, error }
            });
        }
    };

    const createTodo = async (item: TodoItemToCreate) => {
        dispatch({ type: ActionType.CREATE_TODO_REQUEST });
        try {
            const response = await axios.post(`${rootApiUrl}/items`, item);

            // When new todo is created, insert it into original list and
            // redo filter and search, since it may or may not fit into filteredList
            const items = [...state.items, response.data];
            const filteredItems = filterAndSearch(
                items,
                state.filter,
                state.searchQuery
            );

            dispatch({
                type: ActionType.CREATE_TODO_RESPONSE,
                payload: {
                    items,
                    filteredItems,
                    hasError: false
                }
            });
        } catch (error) {
            dispatch({
                type: ActionType.CREATE_TODO_RESPONSE,
                payload: { hasError: true, error }
            });
        }
    };

    const updateTodo = async (item: TodoItem) => {
        dispatch({ type: ActionType.UPDATE_TODO_REQUEST });

        try {
            const response = await axios.put(`${rootApiUrl}/items`, item);

            // When todo is updated, insert it into original list and
            // redo filter and search, since it may or may not fit into filteredList with it's new values
            const items = updateTodoInItems(response.data, state.items);
            const filteredItems = filterAndSearch(
                items,
                state.filter,
                state.searchQuery
            );

            dispatch({
                type: ActionType.UPDATE_TODO_RESPONSE,
                payload: {
                    items,
                    filteredItems,
                    hasError: false
                }
            });
        } catch (error) {
            dispatch({
                type: ActionType.UPDATE_TODO_RESPONSE,
                payload: { hasError: true, error }
            });
        }
    };

    const deleteTodo = async (item: TodoItem) => {
        dispatch({ type: ActionType.DELETE_TODO_REQUEST });

        try {
            const response = await axios.delete(
                `${rootApiUrl}/items/${item.id}`
            );

            // When todo is deleted, remove it from original and filtered list.
            // No need to redo filtering and search.
            const items = removeDeletedItemFromArray(
                response.data,
                state.items
            );
            const filteredItems = removeDeletedItemFromArray(
                response.data,
                state.filteredItems
            );
            const selectedCount = countSelected(filteredItems);

            dispatch({
                type: ActionType.DELETE_TODO_RESPONSE,
                payload: {
                    hasError: false,
                    selectedCount,
                    items,
                    filteredItems
                }
            });
        } catch (error) {
            dispatch({
                type: ActionType.DELETE_TODO_RESPONSE,
                payload: { hasError: true, error }
            });
        }
    };

    const batchDeleteTodos = async () => {
        dispatch({ type: ActionType.BATCH_DELETE_TODOS_REQUEST });

        const selectedItems = state.filteredItems.filter((item: TodoItem) => {
            return item.selected;
        });

        try {
            const response = await axios.post(
                `${rootApiUrl}/items/batch-delete`,
                selectedItems
            );

            // When todos are deleted, remove them from original and filtered list.
            // No need to redo filtering and search.
            const items = removeDeletedItemsFromArray(
                response.data,
                state.items
            );
            const filteredItems = removeDeletedItemsFromArray(
                response.data,
                state.filteredItems
            );
            const selectedCount = countSelected(filteredItems);

            dispatch({
                type: ActionType.BATCH_DELETE_TODOS_RESPONSE,
                payload: {
                    items,
                    filteredItems,
                    selectedCount,
                    hasError: false
                }
            });
        } catch (error) {
            dispatch({
                type: ActionType.BATCH_DELETE_TODOS_RESPONSE,
                payload: { hasError: true, error }
            });
        }
    };

    const toggleSelected = (item: TodoItem) => {
        const items = doToggleSelected(item, state.items);
        const filteredItems = filterAndSearch(
            items,
            state.filter,
            state.searchQuery
        );
        const selectedCount = countSelected(filteredItems);

        dispatch({
            type: ActionType.TOGGLE_SELECTED,
            payload: {
                items,
                filteredItems,
                selectedCount
            }
        });
    };

    const toggleAllSelected = () => {
        const items = doToggleAllSelected(state.items);
        const filteredItems = filterAndSearch(
            items,
            state.filter,
            state.searchQuery
        );
        const selectedCount = countSelected(items);

        dispatch({
            type: ActionType.TOGGLE_ALL_SELECTED,
            payload: {
                items,
                filteredItems,
                selectedCount
            }
        });
    };

    const getItemDetails = (id: number | string) => {
        const details = state.items.find(
            (item: TodoItem) => item.id.toString() === id.toString()
        );

        if (details) {
            dispatch({
                type: ActionType.GET_ITEM_DETAILS,
                payload: { details, hasError: false }
            });
        } else {
            dispatch({
                type: ActionType.GET_ITEM_DETAILS,
                payload: {
                    error: { message: "Item not found" },
                    hasError: true
                }
            });
        }
    };

    const goToPage = (page: number) => {
        dispatch({
            type: ActionType.CHANGE_PAGE,
            payload: { currentPage: page }
        });
    };

    const onChangeFilter = (filter: Filter) => {
        const filteredItems = filterAndSearch(
            state.items,
            filter,
            state.searchQuery
        );
        const selectedCount = countSelected(filteredItems);

        dispatch({
            type: ActionType.ON_CHANGE_FILTER,
            payload: { filter, filteredItems, selectedCount }
        });
    };

    const onChangeSearchQuery = (searchQuery: string) => {
        // Could be improved with debounce so it doesn't
        // perform search on every keystroke
        const filteredItems = filterAndSearch(
            state.items,
            state.filter,
            searchQuery
        );
        const selectedCount = countSelected(filteredItems);

        dispatch({
            type: ActionType.ON_CHANGE_SEARCH_QUERY,
            payload: { searchQuery, filteredItems, selectedCount }
        });
    };

    return (
        <TodoContext.Provider
            value={{
                loading: state.loading,
                error: state.error,
                items: state.items,
                filteredItems: state.filteredItems,
                filter: state.filter,
                searchQuery: state.searchQuery,
                details: state.details,
                selectedCount: state.selectedCount,
                itemsPerPage: state.itemsPerPage,
                currentPage: state.currentPage,
                fetchAll,
                createTodo,
                updateTodo,
                deleteTodo,
                batchDeleteTodos,
                toggleSelected,
                toggleAllSelected,
                getItemDetails,
                goToPage,
                onChangeFilter,
                onChangeSearchQuery
            }}
        >
            {props.children}
        </TodoContext.Provider>
    );
};
