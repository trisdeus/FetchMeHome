import React from "react";
import logo from "../assets/logo.svg";
import logoFull from "../assets/logo-full.svg";

export default function Logo({ size = "default" }) {
  switch (size) {
    case "full":
      return <img src={logoFull} alt="logo" />;
    default:
      return <img src={logo} alt="logo" />;
  }
}
