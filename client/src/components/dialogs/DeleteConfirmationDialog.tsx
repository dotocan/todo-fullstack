import React, { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogTitle,
    DialogActions,
    Button,
    makeStyles,
    DialogContentText
} from "@material-ui/core";
import { Delete } from "@material-ui/icons";
import { TodoItem } from "../../models/models";

interface Props {
    item: TodoItem;
    deleteTodo: (item: TodoItem) => void;
}

const DeleteConfirmationDialog: React.FC<Props> = props => {
    const useStyles = makeStyles({
        question: {
            margin: "2% auto"
        },
        itemTitle: {
            fontWeight: "bold",
            margin: "2% auto"
        }
    });
    const classes = useStyles();

    const [open, setOpen] = useState(false);
    const { item } = props;

    const openDialog = () => {
        setOpen(true);
    };

    const closeDialog = () => {
        setOpen(false);
    };

    const handleDeleteTodoItem = () => {
        props.deleteTodo(item);
        closeDialog();
    };

    return (
        <>
            <Button
                onClick={openDialog}
                startIcon={<Delete />}
                color="secondary"
                variant="contained"
            >
                Delete
            </Button>
            <Dialog open={open} onClose={closeDialog}>
                <DialogTitle>Delete item</DialogTitle>
                <DialogContent>
                    <DialogContentText className={classes.question}>
                        Are you sure you want to delete this item?
                    </DialogContentText>

                    <DialogContentText className={classes.itemTitle}>
                        {item.title}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={closeDialog}>Cancel</Button>
                    <Button
                        variant="outlined"
                        color="secondary"
                        onClick={handleDeleteTodoItem}
                    >
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default DeleteConfirmationDialog;
