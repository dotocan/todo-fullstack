import React from "react";
import { TodoItem } from "../../models/models";
import {
    TableRow,
    TableCell,
    Checkbox,
    makeStyles,
    Button
} from "@material-ui/core";
import DeleteConfirmationDialog from "../dialogs/DeleteConfirmationDialog";
import { Visibility } from "@material-ui/icons";
import { Link } from "react-router-dom";

interface Props {
    item: TodoItem;
    deleteTodo: (item: TodoItem) => void;
    toggleSelected: (item: TodoItem) => void;
    updateTodo: (item: TodoItem) => void;
}

const ItemRow: React.FC<Props> = (props: Props) => {
    const useStyles = makeStyles({
        selected: {
            backgroundColor: "#fce4ec"
        }
    });
    const classes = useStyles();

    const { item } = props;

    const onSelect = () => {
        props.toggleSelected(item);
    };

    const deleteTodo = () => {
        props.deleteTodo(item);
    };

    const updateTodo = () => {
        props.updateTodo({ ...item, completed: !item.completed });
    };

    return (
        <TableRow className={item.selected ? classes.selected : ""}>
            <TableCell padding="checkbox">
                <Checkbox
                    indeterminate={false}
                    // Setting true or false manually to prevent 'changing an uncontrolled input' warning
                    // https://stackoverflow.com/questions/37427508/react-changing-an-uncontrolled-input
                    checked={item.selected ? true : false}
                    onChange={onSelect}
                />
            </TableCell>
            <TableCell>{item.title}</TableCell>
            <TableCell>{item.completed ? "YES" : "NO"}</TableCell>
            <TableCell>
                <Link to={`details/${item.id}`}>
                    <Visibility />
                </Link>
            </TableCell>
            <TableCell>
                <Button
                    color={item.completed ? "secondary" : "primary"}
                    variant="outlined"
                    onClick={updateTodo}
                >
                    {item.completed ? "UNCOMPLETE" : "COMPLETE"}
                </Button>
            </TableCell>
            <TableCell>
                <DeleteConfirmationDialog item={item} deleteTodo={deleteTodo} />
            </TableCell>
        </TableRow>
    );
};

export default ItemRow;
