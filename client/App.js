import React from "react";

import Navbar from "./components/Navbar";
import Routes from "./Routes";
import Chat from "./components/cometchat/Chat"

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes />
      <Chat />
    </div>
  );
};

export default App;
