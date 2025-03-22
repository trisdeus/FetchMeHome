import React from "react";

export default function Button({
  type = "button",
  text,
  primary = "primary",
  color = "white",
  disabled = false,
}) {
  const colorMap = {
    brown: "#693811",
    beige: "#dbb18d",
    white: "#ffffff",
  };

  const buttonColor = colorMap[color] || "white";

  const getLuminance = (hexColor) => {
    const rgb = parseInt(hexColor.slice(1), 16); // Convert hex to RGB
    const r = (rgb >> 16) & 0xff;
    const g = (rgb >> 8) & 0xff;
    const b = (rgb >> 0) & 0xff;
    // Calculate luminance
    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
  };

  const textColor = getLuminance(buttonColor) > 128 ? "#181725" : "white";

  const primaryButtonStyle = {
    backgroundColor: buttonColor,
    color: textColor,
    border: "none",
  };

  const secondaryButtonStyle = {
    border: `2px solid ${buttonColor}`,
    color: buttonColor,
    backgroundColor: "transparent",
  };

  const buttonStyle =
    primary !== "secondary" ? primaryButtonStyle : secondaryButtonStyle;

  return (
    <button type={type} style={buttonStyle} disabled={disabled}>
      {text}
    </button>
  );
}
