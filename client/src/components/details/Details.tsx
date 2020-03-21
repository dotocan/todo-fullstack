import React, { useState, useContext, useEffect } from "react";
import { TodoContext } from "../../context/TodoProvider";
import { Typography, Button, Paper, makeStyles, Fab } from "@material-ui/core";
import { useParams, Link } from "react-router-dom";
import { ArrowBack, Edit } from "@material-ui/icons";
import DetailsEdit from "./DetailsEdit";
import DetailsView from "./DetailsView";

const Details: React.FC = () => {
    const useStyles = makeStyles({
        container: {
            display: "flex",
            flexDirection: "column",
            alignContent: "space-evenly ",
            alignItems: "center"
        },
        item: {
            margin: "2% 0"
        },
        grey: {
            margin: "2% 0",
            color: "#bdbdbd"
        },
        viewEditBtn: {
            margin: "2% 0",
            width: "150px",
            height: "50px"
        }
    });
    const classes = useStyles();

    const { id } = useParams();

    const context = useContext(TodoContext);
    const { getItemDetails, items, details, updateTodo } = context;

    const [editing, setEditing] = useState(false);

    useEffect(() => {
        if (id) getItemDetails(id);
    }, [items]);

    const toggleEditMode = () => {
        setEditing(!editing);
    };

    return (
        <>
            <Link to="/" className={classes.item}>
                <Button startIcon={<ArrowBack />}>Go back</Button>
            </Link>
            {!details ? (
                <Typography variant="h3" className={classes.item}>
                    Error showing item details.
                </Typography>
            ) : (
                <>
                    <Paper elevation={2} className={classes.container}>
                        {editing ? (
                            <DetailsEdit
                                item={details}
                                toggleEditMode={toggleEditMode}
                                updateTodo={updateTodo}
                            />
                        ) : (
                            <DetailsView
                                item={details}
                                updateTodo={updateTodo}
                            />
                        )}

                        {editing ? null : (
                            <Fab
                                className={classes.viewEditBtn}
                                variant="extended"
                                onClick={toggleEditMode}
                            >
                                <Edit />
                                Edit
                            </Fab>
                        )}
                    </Paper>
                </>
            )}
        </>
    );
};

export default Details;
