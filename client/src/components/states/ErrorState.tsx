import React from "react";
import { makeStyles } from "@material-ui/core";
import { TodoError } from "../../models/models";

interface Props {
    error: TodoError;
}

const ErrorState: React.FC<Props> = props => {
    const { description, details } = props.error;

    const useStyles = makeStyles({
        errorContainer: {
            color: "#D8000C",
            backgroundColor: " #FFD2D2"
        }
    });

    const classes = useStyles();

    return (
        <div className={classes.errorContainer}>
            <h3>{description}</h3>
            <p>{details ? details.toString() : ""}</p>
        </div>
    );
};

export default ErrorState;
