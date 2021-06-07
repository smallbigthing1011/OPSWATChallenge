import React, { useEffect } from "react";
import "./App.scss";
import { Login, Signup, Profile, UsersList, ArticlesList } from "./containers";
import { REACT_APP_API_ENPOINT } from "./endpoint";
import { Switch, Route } from "react-router-dom";

const routes = [
  {
    path: "/",
    exact: true,
    main: () => <Signup></Signup>,
  },
  {
    path: "/login",
    exact: false,
    main: () => <Login></Login>,
  },
  {
    path: "/me",
    exact: false,
    main: () => <Profile></Profile>,
  },
  {
    path: "/users",
    exact: false,
    main: () => <UsersList></UsersList>,
  },
  {
    path: "/articles",
    exact: false,
    main: () => <ArticlesList></ArticlesList>,
  },
];

const App: React.FC = () => {
  useEffect(() => {
    console.log(REACT_APP_API_ENPOINT);
  }, []);
  return (
    <div className="App">
      <Switch>
        {routes.map((route, index) => {
          return (
            <Route
              key={index}
              path={route.path}
              exact={route.exact}
              children={<route.main />}
            ></Route>
          );
        })}
      </Switch>
    </div>
  );
};

export default App;
