import React, { useState, ChangeEvent, useEffect } from "react";
import {
    Dialog,
    DialogContent,
    DialogTitle,
    TextField,
    DialogActions,
    Button,
    makeStyles,
    Fab
} from "@material-ui/core";
import { TodoItemToCreate, TextFieldValidation } from "../../models/models";
import { Add } from "@material-ui/icons";

interface Props {
    createTodo: (item: TodoItemToCreate) => void;
}

const CreateTodoDialog: React.FC<Props> = props => {
    const useStyles = makeStyles({
        addButton: {
            width: "150px",
            height: "50px",
        },
        input: {
            margin: "3% auto"
        }
    });
    const classes = useStyles();

    const [open, setOpen] = useState(false);
    const [item, setItem] = useState<TodoItemToCreate>({
        title: "",
        description: ""
    });
    const [titleValidation, setTitleValidation] = useState<TextFieldValidation>(
        {
            error: false,
            helperText: "Title is required"
        }
    );

    useEffect(() => {
        validateTitle(item.title);
    }, [item.title]);

    const openDialog = () => {
        setOpen(true);
    };

    const closeDialog = () => {
        setOpen(false);
    };

    const onTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        const title = e.target.value;
        validateTitle(title);
        setItem({ ...item, title });
    };

    const onDescriptionChange = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        const description = e.target.value;
        setItem({ ...item, description });
    };

    const validateTitle = (title: string) => {
        if (title && title.trim()) {
            setTitleValidation({ ...titleValidation, error: false });
        } else {
            setTitleValidation({ ...titleValidation, error: true });
        }
    };

    const handleCreateTodo = () => {
        props.createTodo(item);
        setItem({
            title: "",
            description: ""
        });
        closeDialog();
    };

    return (
        <>
            <Fab
                className={classes.addButton}
                variant="extended"
                onClick={openDialog}
                color="primary"
            >
                <Add />
                Add Todo
            </Fab>

            <Dialog open={open} onClose={closeDialog}>
                <DialogTitle>Create new Todo item</DialogTitle>
                <DialogContent>
                    <TextField
                        className={classes.input}
                        autoFocus
                        id="title"
                        label="Title"
                        fullWidth
                        variant="outlined"
                        onChange={onTitleChange}
                        {...titleValidation}
                    />

                    <TextField
                        className={classes.input}
                        autoFocus
                        id="description"
                        label="Description"
                        fullWidth
                        variant="outlined"
                        onChange={onDescriptionChange}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={closeDialog}>Cancel</Button>
                    <Button
                        variant="outlined"
                        onClick={handleCreateTodo}
                        disabled={titleValidation.error}
                    >
                        Create
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default CreateTodoDialog;
