import React from "react";
import Header from "../components/Header";
import NavBar from "../components/NavBar";


function NoMatch() {
  return (
    <div>
      <NavBar />
      <Header>
        <h1>404 Page Not Found</h1>
        <h1>
            <span role="img" aria-label="Face With Rolling Eyes Emoji">
            🙄
            </span>
        </h1>
      </Header>
    </div>
  );
}

export default NoMatch;
