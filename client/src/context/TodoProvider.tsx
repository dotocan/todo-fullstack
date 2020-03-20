import React, { createContext, useReducer } from "react";
import TodoReducer from "./TodoReducer";
import {
    TodoItem,
    TodoState,
    ActionType,
    TodoError,
    TodoItemToCreate
} from "../models/models";
import axios from "axios";

const initialState: TodoState = {
    items: [] as TodoItem[],
    selectedCount: 0,
    loading: false,
    error: undefined,

    fetchAll: () => {},
    createTodo: (item: TodoItemToCreate) => {},
    deleteTodo: (item: TodoItem) => {},
    batchDeleteTodos: () => {},
    toggleSelected: (item: TodoItem) => {}
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
                payload: response.data
            });
        } catch (error) {
            dispatch({
                type: ActionType.FETCH_TODOS_RESPONSE,
                payload: { error }
            });
        }
    };

    const createTodo = async (item: TodoItemToCreate) => {
        dispatch({ type: ActionType.CREATE_TODO_REQUEST });

        try {
            const response = await axios.post(`${rootApiUrl}/items`, item);
            dispatch({
                type: ActionType.CREATE_TODO_RESPONSE,
                payload: response.data
            });
        } catch (error) {
            dispatch({
                type: ActionType.CREATE_TODO_RESPONSE,
                payload: { error }
            });
        }
    };

    const deleteTodo = async (item: TodoItem) => {
        dispatch({ type: ActionType.DELETE_TODO_REQUEST });

        try {
            const response = await axios.delete(
                `${rootApiUrl}/items/${item.id}`
            );
            dispatch({
                type: ActionType.DELETE_TODO_RESPONSE,
                payload: response.data
            });
            dispatch({ type: ActionType.COUNT_SELECTED })
        } catch (error) {
            dispatch({
                type: ActionType.DELETE_TODO_RESPONSE,
                payload: { error }
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
            dispatch({
                type: ActionType.BATCH_DELETE_TODOS_RESPONSE,
                payload: response.data
            });
            dispatch({ type: ActionType.COUNT_SELECTED });
        } catch (error) {
            dispatch({
                type: ActionType.BATCH_DELETE_TODOS_RESPONSE,
                payload: { error }
            });
        }
    };

    const toggleSelected = (item: TodoItem) => {
        dispatch({ type: ActionType.TOGGLE_SELECTED, payload: item });
        dispatch({ type: ActionType.COUNT_SELECTED });
    };

    // create details component
    // update todo
    // search component
    // pagination
    // select all
    // progress non dissmissable dialog

    return (
        <TodoContext.Provider
            value={{
                loading: state.loading,
                error: state.error,
                items: state.items,
                selectedCount: state.selectedCount,
                fetchAll,
                createTodo,
                deleteTodo,
                batchDeleteTodos,
                toggleSelected
            }}
        >
            {props.children}
        </TodoContext.Provider>
    );
};
