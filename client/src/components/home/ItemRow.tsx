import React, { useState } from "react";
import { TodoItem } from "../../models/models";
import { TableRow, TableCell, Checkbox, makeStyles } from "@material-ui/core";
import DeleteConfirmationDialog from "../dialogs/DeleteConfirmationDialog";

interface Props {
    item: TodoItem;
    deleteTodo: (item: TodoItem) => void;
    toggleSelected: (item: TodoItem) => void;
}

const ItemRow: React.FC<Props> = (props: Props) => {
    const useStyles = makeStyles({
        selected: {
            backgroundColor: "#fce4ec"
        }
    });
    const classes = useStyles();

    const { item } = props;

    // Using state variable in checkbox to prevent 'changing an uncontrolled input' warning
    // https://stackoverflow.com/questions/37427508/react-changing-an-uncontrolled-input
    const [selected, setSelected] = useState(item.selected);

    const onSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        props.toggleSelected(item);
    };

    const deleteTodo = () => {
        props.deleteTodo(item);
    };

    return (
        <TableRow className={item.selected ? classes.selected : ""}>
            <TableCell padding="checkbox">
                <Checkbox
                    indeterminate={false} // numSelected > 0 && numSelected < rowCount
                    checked={selected} // rowCount > 0 && numSelected === rowCount
                    onChange={onSelect}
                />
            </TableCell>
            <TableCell>{item.title}</TableCell>
            <TableCell>{item.completed ? "YES" : "NO"}</TableCell>
            <TableCell>
                <button>VIEW</button>
            </TableCell>
            <TableCell>
                <button>{item.completed ? "UNCOMPLETE" : "COMPLETE"}</button>
            </TableCell>
            <TableCell>
                <DeleteConfirmationDialog item={item} deleteTodo={deleteTodo} />
            </TableCell>
        </TableRow>
    );
};

export default ItemRow;
