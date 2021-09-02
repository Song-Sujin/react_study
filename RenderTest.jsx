import React, { PureComponent } from "react";

class Test extends PureComponent {
  state = {
    counter: 0,
  };

  onClick = () => {
    this.setState({});
  };
  render() {
    console.log("렌더링", this.state);
    return (
      <div>
        <button onClick={this.onClick}>클릭</button>
      </div>
    );
  }
}

export default Test;
