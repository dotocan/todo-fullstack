import React from "react";
import { TableContainer, Paper, Table, TableBody } from "@material-ui/core";
import TableHeader from "./TableHeader";
import ItemRow from "./ItemRow";
import Pagination from "./Pagination";
import { TodoItem } from "../../models/models";
import { arrayIsNullOrEmpty } from "../../context/helperMethods";
import EmptyFilteredState from "../states/EmptyFilteredState";

interface Props {
    items: TodoItem[];
    selectedCount: number;
    itemsPerPage: number;
    currentPage: number;
    updateTodo: (item: TodoItem) => void;
    deleteTodo: (item: TodoItem) => void;
    toggleSelected: (item: TodoItem) => void;
    toggleAll: () => void;
    goToPage: (page: number) => void;
}

const TodoTable: React.FC<Props> = props => {
    const {
        items,
        selectedCount,
        itemsPerPage,
        currentPage,
        updateTodo,
        deleteTodo,
        toggleSelected,
        toggleAll,
        goToPage
    } = props;

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

    // When some action reduces number of existing pages and user
    // was on a currently non-existing page, reset him to the currently max page
    if (currentPage > Math.ceil(items.length / itemsPerPage)) {
        goToPage(Math.ceil(items.length / itemsPerPage));
    }

    const nextPage = () => {
        goToPage(currentPage + 1);
    };

    const previousPage = () => {
        goToPage(currentPage - 1);
    };

    console.log('TABLE filtereItems', items);

    return (
        <>
            {arrayIsNullOrEmpty(items) ? (
                <EmptyFilteredState />
            ) : (
                <>
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHeader
                                allSelected={selectedCount === items.length}
                                toggleAll={toggleAll}
                            />
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
                    <Pagination
                        nextPage={nextPage}
                        previousPage={previousPage}
                        currentPage={currentPage}
                        maxPage={Math.ceil(items.length / itemsPerPage)}
                    />
                </>
            )}
        </>
    );
};

export default TodoTable;
