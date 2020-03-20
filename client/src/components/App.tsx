import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./home/Home";
import Detail from "./detail/Detail";
import { TodoProvider } from "../context/TodoProvider";

import { makeStyles } from "@material-ui/core/styles";

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
                        <Route exact path="/" component={Home} />
                        <Route exact path="/detail" component={Detail} />
                    </Switch>
                </main>
            </TodoProvider>
        </Router>
    );
};

export default App;
