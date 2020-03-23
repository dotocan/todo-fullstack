import React, { useState, ChangeEvent } from "react";
import { TodoItem, TextFieldValidation } from "../../models/models";
import {
    TextField,
    Button,
    makeStyles,
    Checkbox,
    Typography
} from "@material-ui/core";
import UnsavedChangesDialog from "../dialogs/UnsavedChangesDialog";

interface Props {
    item: TodoItem;
    toggleEditMode: () => void;
    updateTodo: (item: TodoItem) => void;
}

const DetailsEdit: React.FC<Props> = props => {
    const useStyles = makeStyles({
        item: {
            margin: "2% 0"
        },
        row: {
            display: "flex",
            flexDirection: "row",
            margin: "2% 0",
            alignItems: "center"
        }
    });
    const classes = useStyles();

    const { item } = props;

    const [tempItem, setTempItem] = useState<TodoItem>({ ...item });
    const [titleValidation, setTitleValidation] = useState<TextFieldValidation>(
        {
            error: false,
            helperText: "Title is required"
        }
    );

    const onTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        const title = e.target.value;
        validateTitle(title);
        setTempItem({ ...tempItem, title });
    };

    const onDescriptionChange = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        const description = e.target.value;
        setTempItem({ ...tempItem, description });
    };

    const validateTitle = (title: string) => {
        if (title && title.trim()) {
            setTitleValidation({ ...titleValidation, error: false });
        } else {
            setTitleValidation({ ...titleValidation, error: true });
        }
    };

    const toggleCompleted = () => {
        setTempItem({ ...tempItem, completed: !tempItem.completed });
    };

    const updateTodo = () => {
        props.updateTodo({ ...tempItem });
        props.toggleEditMode();
    };

    const hasUnsavedChanges = () => {
        if (tempItem.title !== item.title) return true;
        if (tempItem.description !== item.description) return true;
        if (tempItem.completed !== item.completed) return true;

        return false;
    };

    return (
        <>
            <TextField
                className={classes.item}
                autoFocus
                id="title"
                label="Title"
                variant="outlined"
                onChange={onTitleChange}
                value={tempItem.title}
                {...titleValidation}
            />

            <TextField
                className={classes.item}
                id="description"
                label="Description"
                variant="outlined"
                value={tempItem.description}
                onChange={onDescriptionChange}
            />

            <div className={classes.row}>
                <Checkbox
                    onChange={toggleCompleted}
                    checked={tempItem.completed ? true : false}
                />
                <Typography>Completed</Typography>
            </div>

            <div className={classes.row}>
                <UnsavedChangesDialog
                    unsavedChanges={hasUnsavedChanges()}
                    toggleEditMode={props.toggleEditMode}
                />

                <Button variant="outlined" color="primary" onClick={updateTodo}>
                    Save changes
                </Button>
            </div>
        </>
    );
};

export default DetailsEdit;
