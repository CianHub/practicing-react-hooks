import React, { useState } from "react";
import Todo from "./components/Todo";
import Header from "./components/Header";
import Auth from "./components/Auth";
import AuthContext from "./auth-context";

const app = props => {
  const [page, setPage] = useState("auth"),
    onLoadPage = page => setPage(page),
    componentToLoad = page === "auth" ? <Auth /> : <Todo />,
    [authStatus, setAuthStatus] = useState(false),
    login = () => {
      setAuthStatus(true);
    };

  return (
    <div className="App">
      <AuthContext.Provider value={{ status: authStatus, login: login }}>
        <Header
          onLoadAuth={() => onLoadPage("auth")}
          onLoadTodos={() => onLoadPage("todos")}
        />
        <hr />
        {componentToLoad}
      </AuthContext.Provider>
    </div>
  );
};

export default app;
