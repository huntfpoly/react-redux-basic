import React, { useState } from "react";

ColorBox.propTypes = {};

function getRandomColor() {
  const COLOR_LIST = ["deepping", "red", "yellow", "blue", "purple"];
  const randomIndex = Math.trunc(Math.random() * 5);
  return COLOR_LIST[randomIndex];
}
function ColorBox(props) {
  const [color, setColor] = useState("deeppink");
  function handelBoxClick() {
    const newColor = getRandomColor();
    setColor(newColor);
  }
  return (
    <div
      className="color-box"
      style={{ backgroundColor: color }}
      onClick={handelBoxClick}
    >
      color box
    </div>
  );
}

export default ColorBox;
