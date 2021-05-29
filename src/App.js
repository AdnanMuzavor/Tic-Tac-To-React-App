import React, { Component } from "react";

import Game from "./components/Game";

const cssstyle={
  display:"flex",
  alignItems:"center",
  padding:"250px",
  backgroundColor:"yellow",
  justifyContent:"center",
}
class App extends Component {
  render() {
    return (
      <React.Fragment>
        <div style={cssstyle}>
        <Game />
        </div>
      </React.Fragment>
    );
  }
}
export default App;
