import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Name from "./Name";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Name />
        <Clock />
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date()
    };
  }

  // Runs after component output has been rendered to the DOM
  componentDidMount() {
    this.timerID = setInterval(() => this.tick(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    this.setState({
      date: new Date()
    });
  }

  render() {
    return <div>The time is: {this.state.date.toLocaleTimeString()}</div>;
  }
}

export default App;
