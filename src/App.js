import React from "react";
import { HeaderMenu } from "./component/NavBar/NavBar";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Line } from "./component/Line/Line";
import { Area } from "./component/Area/Area";

function App() {
  return (
    <div>
      <Router>
        <HeaderMenu />
        <Route path="/Line" exact component={Line} />
        <Route path="/Area" exact component={Area} />
      </Router>
    </div>
  );
}

export default App;
