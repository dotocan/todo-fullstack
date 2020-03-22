import React, { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogTitle,
    DialogActions,
    Button,
    makeStyles,
    DialogContentText,
    Fab
} from "@material-ui/core";
import { Delete } from "@material-ui/icons";

interface Props {
    selectedCount: number;
    batchDeleteTodos: () => void;
}

const BatchDeleteConfirmationDialog: React.FC<Props> = props => {
    const useStyles = makeStyles({
        btn: {
            marginLeft: "1%"
        },
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
    const { selectedCount } = props;

    const openDialog = () => {
        setOpen(true);
    };

    const closeDialog = () => {
        setOpen(false);
    };

    const handleBatchDeleteTodos = () => {
        props.batchDeleteTodos();
        closeDialog();
    };

    return (
        <>
            <Fab
                onClick={openDialog}
                color="secondary"
                variant="extended"
                className={classes.btn}
            >
                <Delete />
                {`Delete ${selectedCount} items`}
            </Fab>
            <Dialog open={open} onClose={closeDialog}>
                <DialogTitle>Delete multiple items</DialogTitle>
                <DialogContent>
                    <DialogContentText className={classes.question}>
                        {`You are about to delete ${selectedCount} selected items. Are you sure?`}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={closeDialog}>Cancel</Button>
                    <Button
                        variant="outlined"
                        color="secondary"
                        onClick={handleBatchDeleteTodos}
                    >
                        {`Delete ${selectedCount} items`}
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default BatchDeleteConfirmationDialog;
