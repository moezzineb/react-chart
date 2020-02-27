import React from "react";
import { HeaderMenu } from "./component/NavBar/NavBar";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Line } from "./component/Line/Line";
import { Area } from "./component/Area/Area";
import { Column } from "./component/ColumnBar/Column";
import { Pie } from "./component/PieFunnel/Pie";

function App() {
  return (
    <div>
      <Router>
        <HeaderMenu />
        <Route path="/Line" exact component={Line} />
        <Route path="/Area" exact component={Area} />
        <Route path="/ColumnBar" exact component={Column} />
        <Route path="/PieFunnel" exact component={Pie} />
      </Router>
    </div>
  );
}

export default App;
