import React from "react";
import { makeStyles, Fab, Typography } from "@material-ui/core";
import { NavigateNext, NavigateBefore } from "@material-ui/icons";

interface Props {
    nextPage: () => void;
    previousPage: () => void;
    currentPage: number;
    maxPage: number;
}

const Pagination: React.FC<Props> = props => {
    const useStyles = makeStyles({
        paginationContainter: {
            width: "100%",
            display: "flex",
            flexDirection: "row-reverse",
            alignItems: "center",
            margin: "2% auto"
        },
        paginationItem: {
            margin: "0 1%"
        }
    });
    const classes = useStyles();

    const { nextPage, previousPage, currentPage, maxPage } = props;

    return (
        <div className={classes.paginationContainter}>
            <Fab onClick={nextPage} disabled={currentPage === maxPage}>
                <NavigateNext />
            </Fab>

            <Typography variant="h6" className={classes.paginationItem}>
                {currentPage}
            </Typography>

            <Fab onClick={previousPage} disabled={currentPage === 1}>
                <NavigateBefore />
            </Fab>
        </div>
    );
};

export default Pagination;
