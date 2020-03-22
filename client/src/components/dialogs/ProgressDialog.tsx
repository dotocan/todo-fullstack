import React, { useContext, useEffect } from "react";
import { TodoContext } from "../../context/TodoProvider";
import {
    makeStyles,
    Typography,
    LinearProgress,
    Dialog,
    DialogContent
} from "@material-ui/core";

const ProgressDialog = () => {
    const useStyles = makeStyles({
        item: {
            margin: "2% 0"
        }
    });
    const classes = useStyles();

    const context = useContext(TodoContext);
    const { loading } = context;

    return (
        <Dialog open={loading} disableBackdropClick={true}>
            <DialogContent>
                <Typography className={classes.item} variant="h3">
                    Please wait...
                </Typography>
                <LinearProgress className={classes.item} />
            </DialogContent>
        </Dialog>
    );
};

export default ProgressDialog;
