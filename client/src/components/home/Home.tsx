import React, { useContext, useEffect } from "react";

import { Filter } from "../../models/models";
import { makeStyles, TextField } from "@material-ui/core";
import { TodoContext } from "../../context/TodoProvider";
import EmptyState from "../states/EmptyState";
import ErrorState from "../states/ErrorState";
import CreateTodoDialog from "../dialogs/CreateTodoDialog";
import BatchDeleteConfirmationDialog from "../dialogs/BatchDeleteConfirmationDialog";
import TodoTable from "./TodoTable";
import { arrayIsNullOrEmpty } from "../../context/helperMethods";

const Home: React.FC = () => {
    const useStyles = makeStyles({
        actionsContainer: {
            width: "100%",
            display: "flex",
            flexDirection: "row-reverse",
            marginBottom: "2%"
        },
        action: {
            marginLeft: "1%"
        }
    });
    const classes = useStyles();

    const context = useContext(TodoContext);
    const {
        items,
        filteredItems,
        selectedCount,
        itemsPerPage,
        currentPage,
        filter,
        searchQuery,
        fetchAll,
        createTodo,
        updateTodo,
        deleteTodo,
        batchDeleteTodos,
        toggleSelected,
        toggleAllSelected,
        goToPage,
        onChangeFilter,
        onChangeSearchQuery,
        loading,
        error
    } = context;

    useEffect(() => {
        if (!loading && arrayIsNullOrEmpty(items)) {
            fetchAll();
        }
    }, []);

    const onSearchQueryChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        onChangeSearchQuery(event.target.value);
    };

    const onFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        onChangeFilter(event.target.value as Filter);
    };

    console.log("HOME filtereItems", filteredItems);

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

                {!arrayIsNullOrEmpty(items) && (
                    <>
                        <TextField
                            id="filter-by"
                            select
                            label="Filter items"
                            value={filter}
                            onChange={onFilterChange}
                            SelectProps={{
                                native: true
                            }}
                            variant="outlined"
                            className={classes.action}
                        >
                            <option key={Filter.ALL} value={Filter.ALL}>
                                All
                            </option>
                            <option
                                key={Filter.COMPLETED}
                                value={Filter.COMPLETED}
                            >
                                Only completed
                            </option>
                            <option
                                key={Filter.UNCOMPLETED}
                                value={Filter.UNCOMPLETED}
                            >
                                Only uncompleted
                            </option>
                        </TextField>

                        <TextField
                            id="search"
                            label="search"
                            fullWidth
                            variant="outlined"
                            value={searchQuery}
                            onChange={onSearchQueryChange}
                        ></TextField>
                    </>
                )}
            </div>

            {error ? (
                <ErrorState error={error} />
            ) : !arrayIsNullOrEmpty(items) ? (
                <>
                    <TodoTable
                        items={filteredItems}
                        selectedCount={selectedCount}
                        itemsPerPage={itemsPerPage}
                        currentPage={currentPage}
                        updateTodo={updateTodo}
                        deleteTodo={deleteTodo}
                        toggleSelected={toggleSelected}
                        toggleAll={toggleAllSelected}
                        goToPage={goToPage}
                    />
                </>
            ) : (
                <EmptyState />
            )}
        </>
    );
};

export default Home;
