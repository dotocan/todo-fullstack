import React from "react";
import { makeStyles, Typography, Paper } from "@material-ui/core";

const EmptyState: React.FC = () => {
    const useStyles = makeStyles({
        emptyContainer: {
            borderRadius: "5px",
            color: "rgba(0, 0, 0, 0.87)",
            display: "flex",
            flexDirection: "column"
        },
        text: {
            alignSelf: "center",
            margin: "1%"
        }
    });

    const classes = useStyles();

    return (
        <Paper elevation={2} className={classes.emptyContainer}>
            <Typography variant="h4" className={classes.text}>
                The list is empty
            </Typography>
            <Typography variant="h6" className={classes.text}>
                Add something by clicking the "Add Todo" button on top of the
                screen.
            </Typography>
        </Paper>
    );
};

export default EmptyState;
