import React, { createContext, useReducer } from "react";
import TodoReducer from "./TodoReducer";
import {
    TodoItem,
    TodoState,
    ActionType,
    TodoItemToCreate
} from "../models/models";
import axios from "axios";
import {
    doToggleSelected,
    countSelected,
    doToggleAllSelected,
    removeDeletedItemFromArray,
    removeDeletedItemsFromArray,
    updateTodoInItems
} from "./helperMethods";

const initialState: TodoState = {
    items: [] as TodoItem[],
    selectedCount: 0,
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
            dispatch({
                type: ActionType.CREATE_TODO_RESPONSE,
                payload: { createdItem: response.data, hasError: false }
            });
        } catch (error) {
            dispatch({
                type: ActionType.CREATE_TODO_RESPONSE,
                payload: { hasError: true, error }
            });
        }
    };

    const updateTodo = async (item: TodoItem) =>  {
        dispatch({ type: ActionType.UPDATE_TODO_REQUEST })

        try {
            const response = await axios.put(`${rootApiUrl}/items`, item);

            const items = updateTodoInItems(response.data, state.items);

            dispatch({
                type: ActionType.UPDATE_TODO_RESPONSE,
                payload: { items, hasError: false }
            });
        } catch (error) {
            dispatch({
                type: ActionType.UPDATE_TODO_RESPONSE,
                payload: { hasError: true, error }
            });
        }
    }

    const deleteTodo = async (item: TodoItem) => {
        dispatch({ type: ActionType.DELETE_TODO_REQUEST });

        try {
            const response = await axios.delete(
                `${rootApiUrl}/items/${item.id}`
            );

            const items = removeDeletedItemFromArray(
                response.data,
                state.items
            );

            const selectedCount = countSelected(items);

            dispatch({
                type: ActionType.DELETE_TODO_RESPONSE,
                payload: { hasError: false, selectedCount, items }
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

        const selectedItems = state.items.filter((item: TodoItem) => {
            return item.selected;
        });

        try {
            const response = await axios.post(
                `${rootApiUrl}/items/batch-delete`,
                selectedItems
            );

            const items = removeDeletedItemsFromArray(
                response.data,
                state.items
            );
            const selectedCount = countSelected(items);
 
            dispatch({
                type: ActionType.BATCH_DELETE_TODOS_RESPONSE,
                payload: { items, selectedCount, hasError: false }
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
        const selectedCount = countSelected(items);

        dispatch({
            type: ActionType.TOGGLE_SELECTED,
            payload: {
                items,
                selectedCount
            }
        });
    };

    const toggleAllSelected = () => {
        const items = doToggleAllSelected(state.items);
        const selectedCount = countSelected(items);

        dispatch({
            type: ActionType.TOGGLE_ALL_SELECTED,
            payload: {
                items,
                selectedCount
            }
        });
    };

    const getItemDetails = (id: number | string) => {
        const details = state.items.find((item: TodoItem) => item.id.toString() === id.toString());

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

    // search component
    // pagination
    // progress non dissmissable dialog

    return (
        <TodoContext.Provider
            value={{
                loading: state.loading,
                error: state.error,
                items: state.items,
                details: state.details,
                selectedCount: state.selectedCount,
                fetchAll,
                createTodo,
                updateTodo,
                deleteTodo,
                batchDeleteTodos,
                toggleSelected,
                toggleAllSelected,
                getItemDetails
            }}
        >
            {props.children}
        </TodoContext.Provider>
    );
};
