import React, { useContext, useEffect } from "react";

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
    makeStyles
} from "@material-ui/core";
import { TodoContext } from "../../context/TodoProvider";
import EmptyState from "../states/EmptyState";
import ErrorState from "../states/ErrorState";
import CreateTodoDialog from "../dialogs/CreateTodoDialog";
import BatchDeleteConfirmationDialog from "../dialogs/BatchDeleteConfirmationDialog";

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
        fetchAll,
        createTodo,
        updateTodo,
        deleteTodo,
        batchDeleteTodos,
        toggleSelected,
        toggleAllSelected,
        loading,
        error
    } = context;

    useEffect(() => {
        if (!loading) {
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
                            {items.map(item => {
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
            ) : (
                <EmptyState />
            )}
        </>
    );
};

export default Home;
