import React, { useContext, useEffect, useState } from "react";

import { TodoItem } from "../../models/models";
import {
    makeStyles,
    TextField,
    Button
} from "@material-ui/core";
import { TodoContext } from "../../context/TodoProvider";
import EmptyState from "../states/EmptyState";
import ErrorState from "../states/ErrorState";
import CreateTodoDialog from "../dialogs/CreateTodoDialog";
import BatchDeleteConfirmationDialog from "../dialogs/BatchDeleteConfirmationDialog";
import TodoTable from "./TodoTable";

const Home: React.FC = () => {
    const useStyles = makeStyles({
        actionsContainer: {
            width: "100%",
            display: "flex",
            flexDirection: "row-reverse",
            marginBottom: "2%"
        }
    });
    const classes = useStyles();

    const context = useContext(TodoContext);
    const {
        items,
        selectedCount,
        itemsPerPage,
        currentPage,
        fetchAll,
        createTodo,
        updateTodo,
        deleteTodo,
        batchDeleteTodos,
        toggleSelected,
        toggleAllSelected,
        nextPage,
        previousPage,
        loading,
        error
    } = context;

    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        if (!loading && isNullOrEmpty(items)) {
            fetchAll();
        }
    }, []);

    const isNullOrEmpty = (array: TodoItem[]) => {
        if (!array) return true;
        if (array.length === 0) return true;

        return false;
    };

    const returnSearchResults = () => {
        const results = items.filter((item: TodoItem) => {
            return (
                item.title.includes(searchQuery) ||
                (item.description && item.description.includes(searchQuery))
            );
        });

        console.log(results);
    };

    const onChangeSearchQuery = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.value === "" || !e.target.value)
            console.log("not in search mode");
        setSearchQuery(e.target.value);
    };

    return (
        <>
            <div className={classes.actionsContainer}>
                <CreateTodoDialog createTodo={createTodo} />
                {selectedCount > 0 ? (
                    <BatchDeleteConfirmationDialog
                        selectedCount={selectedCount}
                        batchDeleteTodos={batchDeleteTodos}
                    />
                ) : null}

                <Button variant="outlined" onClick={returnSearchResults}>
                    Search
                </Button>

                <TextField
                    autoFocus
                    id="search"
                    label="search"
                    fullWidth
                    variant="outlined"
                    value={searchQuery}
                    onChange={onChangeSearchQuery}
                ></TextField>
            </div>

            {error ? (
                <ErrorState error={error} />
            ) : !isNullOrEmpty(items) ? (
                <>
                    <TodoTable
                        items={items}
                        selectedCount={selectedCount}
                        itemsPerPage={itemsPerPage}
                        currentPage={currentPage}
                        updateTodo={updateTodo}
                        deleteTodo={deleteTodo}
                        toggleSelected={toggleSelected}
                        toggleAll={toggleAllSelected}
                        nextPage={nextPage}
                        previousPage={previousPage}
                    />
                </>
            ) : (
                <EmptyState />
            )}
        </>
    );
};

export default Home;
