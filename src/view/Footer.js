import React from "react";
import { GoBackButton } from "../components/GoBackButton";

export default function Footer() {
  return (
    
    <div
      style={{
        background: "  rgba(25,78,34,0.9)",
        height: 30,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "fixed",
        width:"100%",
        bottom: 0,
      }}
    >
      <GoBackButton />
      <p>LBY Shop | Created by Laura Tronchin</p>
    </div>
  );
}
