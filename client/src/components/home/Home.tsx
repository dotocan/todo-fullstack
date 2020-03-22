import React, { useContext, useEffect, useState } from "react";

import { TodoItem } from "../../models/models";
import ItemRow from "./ItemRow";
import {
    TableContainer,
    Paper,
    Table,
    TableHead,
    TableRow,
    TableCell,
    Checkbox,
    TableBody,
    makeStyles,
    Typography,
    Fab
} from "@material-ui/core";
import { TodoContext } from "../../context/TodoProvider";
import EmptyState from "../states/EmptyState";
import ErrorState from "../states/ErrorState";
import CreateTodoDialog from "../dialogs/CreateTodoDialog";
import BatchDeleteConfirmationDialog from "../dialogs/BatchDeleteConfirmationDialog";
import { NavigateBefore, NavigateNext } from "@material-ui/icons";

const Home: React.FC = () => {
    const useStyles = makeStyles({
        actionsContainer: {
            width: "100%",
            display: "flex",
            flexDirection: "row-reverse",
            marginBottom: "2%"
        },
        paginationContainter: {
            width: "100%",
            display: "flex",
            flexDirection: "row-reverse",
            alignItems: "center",
            margin: "2% auto"
        },
        paginationItem: {
            margin: "0 1%"
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

    const [maxPage, setMaxPage] = useState(
        Math.ceil(items.length / itemsPerPage)
    );

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

    const toggleAll = () => {
        toggleAllSelected();
    };

    const getItemsForCurrentPage = () => {
        let start;
        let end;
        let maxPage = Math.ceil(items.length / itemsPerPage);

        if (currentPage === 1) {
            start = 0;
            end = itemsPerPage;
        } else if (currentPage === maxPage) {
            start = currentPage * itemsPerPage - itemsPerPage;
            end = items.length;
        } else {
            start = currentPage * itemsPerPage - itemsPerPage;
            end = start + itemsPerPage;
        }

        return items.slice(start, end);
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
            </div>

            {error ? (
                <ErrorState error={error} />
            ) : !isNullOrEmpty(items) ? (
                <>
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell padding="checkbox">
                                        <Checkbox
                                            indeterminate={false}
                                            // Setting true or false manually to prevent 'changing an uncontrolled input' warning
                                            // https://stackoverflow.com/questions/37427508/react-changing-an-uncontrolled-input
                                            checked={
                                                selectedCount === items.length
                                                    ? true
                                                    : false
                                            }
                                            onChange={toggleAll}
                                        />
                                    </TableCell>
                                    <TableCell>Title</TableCell>
                                    <TableCell>Completed</TableCell>
                                    <TableCell>View</TableCell>
                                    <TableCell>Toggle completed</TableCell>
                                    <TableCell>Delete</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {getItemsForCurrentPage().map(item => {
                                    return (
                                        <ItemRow
                                            key={item.id}
                                            item={item}
                                            toggleSelected={toggleSelected}
                                            updateTodo={updateTodo}
                                            deleteTodo={deleteTodo}
                                        />
                                    );
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>

                    <div className={classes.paginationContainter}>
                        <Fab
                            onClick={nextPage}
                            disabled={
                                currentPage === Math.ceil(items.length / itemsPerPage)
                            }
                        >
                            <NavigateNext />
                        </Fab>

                        <Typography
                            variant="h6"
                            className={classes.paginationItem}
                        >
                            {currentPage}
                        </Typography>

                        <Fab onClick={previousPage} disabled={currentPage === 1}>
                            <NavigateBefore />
                        </Fab>
                    </div>
                </>
            ) : (
                <EmptyState />
            )}
        </>
    );
};

export default Home;
