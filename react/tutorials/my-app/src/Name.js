import React from "react";

class Name extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      first: "Jeremy",
      last: "Buganan"
    };
  }

  render() {
    return (
      <div>
        {this.state.first} {this.state.last}
      </div>
    );
  }
}

export default Name;
