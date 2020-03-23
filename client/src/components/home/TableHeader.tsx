import React from "react";
import { TableHead, TableRow, TableCell, Checkbox } from "@material-ui/core";
import { ArrowDownward } from "@material-ui/icons";

interface Props {
    allSelected: boolean;
    toggleAll: () => void;
}

const TableHeader: React.FC<Props> = props => {
    const { allSelected, toggleAll } = props;

    return (
        <TableHead>
            <TableRow>
                <TableCell padding="checkbox">
                    <Checkbox
                        indeterminate={false}
                        // Setting true or false manually to prevent 'changing an uncontrolled input' warning
                        // https://stackoverflow.com/questions/37427508/react-changing-an-uncontrolled-input
                        checked={allSelected ? true : false}
                        onChange={toggleAll}
                    />
                </TableCell>
                <TableCell>Title</TableCell>
                <TableCell>Completed</TableCell>
                <TableCell>Created</TableCell>
                <TableCell>View</TableCell>
                <TableCell>Toggle completed</TableCell>
                <TableCell>Delete</TableCell>
            </TableRow>
        </TableHead>
    );
};

export default TableHeader;
