import React, { Component } from "react";

console.log("outer render");

class Test extends Component {
  
  state = {
    counter : 0,
  }

  shouldComponentUpdate(nextProps, nextState) {
    if(this.state.counter !== nextState.counter){
      return true;
    }
    return false;
  }

  onClickEvent = () => {
    console.log("click");
    // re-render - 값이 바뀌지도 않는데 re-render
    this.setState({ });

    // re-render - 값이 바뀌니까 
    // this.setState((prevState) => {
    //   return {
    //     counter: prevState.counter + 1
    //   }
    // });
  };
  render() {
    console.log('rendering :>> ', this.state);
    return (
      <>
        <h1>test class</h1>
        <h2>{this.state.counter}</h2>
        <button onClick={this.onClickEvent}>button</button>
      </>
    );
    }  
}
export default Test
