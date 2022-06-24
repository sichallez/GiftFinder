import React from "react";

import Navbar from "./components/Navbar";
import Routes from "./Routes";
import Chat from "./components/cometchat/Chat"

const App = () => {
   if (!window.localStorage.getItem("isRemember")) {
    window.localStorage.setItem("isRemember", "[]");
  }

  return (
    <div>
      <Navbar />
      <Routes />
      <Chat />
    </div>
  );
};

export default App;
