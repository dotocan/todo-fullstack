import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./home/Home";
import Details from "./details/Details";
import { TodoProvider } from "../context/TodoProvider";

import { makeStyles } from "@material-ui/core/styles";
import ProgressDialog from "./dialogs/ProgressDialog";

const App: React.FC = () => {
    const useStyles = makeStyles({
        main: {
            width: "80%",
            margin: "2% auto"
        }
    });
    const classes = useStyles();

    return (
        <Router>
            <TodoProvider>
                <main className={classes.main}>
                    <Switch>
                        <Route path="/details/:id" component={Details} />
                        <Route exact path="/" component={Home} />
                    </Switch>
                    <ProgressDialog />
                </main>
            </TodoProvider>
        </Router>
    );
};

export default App;
