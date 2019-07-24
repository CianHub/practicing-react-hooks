import React, { useState } from "react";
import Todo from "./components/Todo";
import Header from "./components/Header";
import Auth from "./components/Auth";

const app = props => {
  const [page, setPage] = useState("auth"),
    onLoadPage = page => setPage(page),
    componentToLoad = page === "auth" ? <Auth /> : <Todo />;

  return (
    <div className="App">
      <Header
        onLoadAuth={() => onLoadPage("auth")}
        onLoadTodos={() => onLoadPage("todos")}
      />
      <hr />
      {componentToLoad}
    </div>
  );
};

export default app;
