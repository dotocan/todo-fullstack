import React from "react";
import { TodoItem } from "../../models/models";
import { Typography, Button, Fab, makeStyles } from "@material-ui/core";

interface Props {
    item: TodoItem;
    updateTodo: (item: TodoItem) => void;
}

const DetailsView: React.FC<Props> = props => {
    const useStyles = makeStyles({
        item: {
            margin: "2% 0"
        },
        grey: {
            margin: "2% 0",
            color: "#bdbdbd"
        }
    });
    const classes = useStyles();

    const { item } = props;

    const toggleCompleted = () => {
        props.updateTodo({ ...item, completed: !item.completed });
    };

    return (
        <>
            <Typography variant="h3" className={classes.item}>
                {item.title}
            </Typography>

            <Typography
                className={item.description ? classes.item : classes.grey}
                variant="h6"
            >
                {item.description
                    ? item.description
                    : "This item has no description"}
            </Typography>

            <Button
                color={item.completed ? "secondary" : "primary"}
                variant="outlined"
                className={classes.item}
                onClick={toggleCompleted}
            >
                {item.completed ? "UNCOMPLETE" : "COMPLETE"}
            </Button>
        </>
    );
};

export default DetailsView;
