import React, { useState } from "react";
import Dropdown from "../assets/svg/dropdown.svg";

export default function FAQItem({ question, answer }) {
  const [open, setOpen] = useState(false);

  return (
    <div onClick={() => setOpen((prev) => !prev)} className="faq-item">
      <div>
        {question}
        <img
          src={Dropdown}
          alt="dropdown"
          style={{
            transform: open ? "rotate(180deg)" : "rotate(0deg)",
            transition: "transform 0.3s ease",
          }}
        />
      </div>

      {open && <div>{answer}</div>}
    </div>
  );
}
