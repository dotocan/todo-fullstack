import React, { useState } from "react";
import {
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions
} from "@material-ui/core";

interface Props {
    unsavedChanges: boolean;
    toggleEditMode: () => void;
}

const UnsavedChangesDialog: React.FC<Props> = props => {
    const [open, setOpen] = useState(false);

    const openDialog = () => {
        setOpen(true);
    };

    const backToEdit = () => {
        setOpen(false);
    };

    const discardAndExit = () => {
        props.toggleEditMode();
        setOpen(false);
    };

    return (
        <>
            <Button
                color="secondary"
                onClick={
                    props.unsavedChanges ? openDialog : props.toggleEditMode
                }
            >
                Cancel
            </Button>

            <Dialog open={open}>
                <DialogTitle>Unsaved changes</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        You have some unsaved changes for this item. Are you
                        sure you want to exit and discard them?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={backToEdit}>Continue editing</Button>
                    <Button
                        variant="outlined"
                        color="secondary"
                        onClick={discardAndExit}
                    >
                        Discard and exit
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default UnsavedChangesDialog;
