import React, { useContext, useEffect } from "react";

import { Filter, OrderBy, OrderDirection } from "../../models/models";
import { makeStyles, TextField } from "@material-ui/core";
import { TodoContext } from "../../context/TodoProvider";
import EmptyState from "../states/EmptyState";
import ErrorState from "../states/ErrorState";
import CreateTodoDialog from "../dialogs/CreateTodoDialog";
import BatchDeleteConfirmationDialog from "../dialogs/BatchDeleteConfirmationDialog";
import TodoTable from "./TodoTable";
import { arrayIsNullOrEmpty, orderItems } from "../../context/helperMethods";

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
        orderBy,
        orderDirection,
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
        onChangeOrderBy,
        onChangeOrderDirection,
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

    const onOrderByChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        onChangeOrderBy(event.target.value as OrderBy);
    };

    const onOrderDirectionChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        onChangeOrderDirection(event.target.value as OrderDirection);
    };

    const sortItems = () => {
        return orderItems(filteredItems, orderBy, orderDirection);
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

            <div className={classes.actionsContainer}>
                {!arrayIsNullOrEmpty(items) ? (
                    <>
                        <TextField
                            id="order-direction"
                            select
                            label="Order direction"
                            value={orderDirection}
                            onChange={onOrderDirectionChange}
                            SelectProps={{
                                native: true
                            }}
                            variant="outlined"
                            className={classes.action}
                        >
                            <option
                                key={OrderDirection.ASC}
                                value={OrderDirection.ASC}
                            >
                                Ascending
                            </option>
                            <option
                                key={OrderDirection.DESC}
                                value={OrderDirection.DESC}
                            >
                                Descending
                            </option>
                        </TextField>

                        <TextField
                            id="order-by"
                            select
                            label="Order by"
                            value={orderBy}
                            onChange={onOrderByChange}
                            SelectProps={{
                                native: true
                            }}
                            variant="outlined"
                            className={classes.action}
                        >
                            <option key={OrderBy.DATE} value={OrderBy.DATE}>
                                Date created
                            </option>
                            <option key={OrderBy.TITLE} value={OrderBy.TITLE}>
                                Title
                            </option>
                        </TextField>
                    </>
                ) : null}
            </div>

            {error ? (
                <ErrorState error={error} />
            ) : !arrayIsNullOrEmpty(items) ? (
                <>
                    <TodoTable
                        items={sortItems()}
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
