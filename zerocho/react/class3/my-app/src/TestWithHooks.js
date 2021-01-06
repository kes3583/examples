import React, { useState } from "react";

console.log("outer render");
export default function Test() {
  console.log("component rendering");
  const [counter, setCounter] = useState(0);

  const onClickEvent = () => {
    console.log("click");
    //setCounter();
    setCounter((prevCounter) => prevCounter + 1);
  };
  return (
    <>
      {console.log('render')}
      <h1>test hooks</h1>
      <h2>{counter}</h2>
      <button onClick={onClickEvent}>button</button>
    </>
  );
}
