import React from "react";
import { Typography } from "@material-ui/core";

const EmptyFilteredState: React.FC = () => {
    return (
        <Typography variant="h3">
            No results match your current search and/or filter criteria
        </Typography>
    );
};

export default EmptyFilteredState;
