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

    let numberOfPages = Math.ceil(items.length / itemsPerPage);

    const getItemsForCurrentPage = () => {
        let start;
        let end;

        if (currentPage === 1) {
            start = 0;
            end = itemsPerPage;
        } else if (currentPage === numberOfPages) {
            start = currentPage * itemsPerPage - itemsPerPage;
            end = items.length;
        } else {
            start = currentPage * itemsPerPage - itemsPerPage;
            end = start + itemsPerPage;
        }

        return items.slice(start, end);
    };

    // This if statement fixes several issues:
    /*
        - First problem:
        When user is on page 5 and filtering reduces results to only two pages, page 5 stops existing.
        This piece of logic was introduced to fix it. It sets the table to currently available max page.
        if (currentPage(5) > numberOfPages(2)) { 
            goToPage(numberOfPages); 
        } 

        - Above fix introduces a new issue: 
        When filtering returns no results number of pages gets calculated as 0. 
        if (currentPage(5) > numberOfPages(0)){
            goToPage(0);
        }
        will set currentPage to 0, but page 0 doesn't exist, which causes the table to break.
        To fix this, statement needs to get expanded to handle the case when current page 
        is set to 0
        if (currentPage > numberOfPages || currentPage === 0) {
            goToPage(numberOfPages);
        }
        
        - Second fix causes infinite loop. When filtering returns 0 results, currentPage will be set to 0
        which will trigger the if statement to set it to max page available. But max page available for
        0 results is still 0 so the if statement gets triggered forever and breaks the app. To fix this final
        issue, we need to check whether there are any results available. If there are none because of
        the current filtering, don't even go to any page. When user removes the filtering and results become
        available again (!arrayIsNullOrEmpty(items)), only then check for other conditions described above.
    */
    if (
        !arrayIsNullOrEmpty(items) &&
        (currentPage > numberOfPages || currentPage === 0)
    ) {
        goToPage(numberOfPages);
    }

    const nextPage = () => {
        goToPage(currentPage + 1);
    };

    const previousPage = () => {
        goToPage(currentPage - 1);
    };

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
                        maxPage={numberOfPages}
                    />
                </>
            )}
        </>
    );
};

export default TodoTable;
