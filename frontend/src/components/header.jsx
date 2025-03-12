import { useState } from "react";
import Logo from "./logo";

export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <header>
      <Logo />
      <nav>
        <ul>
          {isLoggedIn ? (
            <>
              <li>
                <a href="/services">Services</a>
              </li>
              <li>
                <a href="/faqs">FAQs</a>
              </li>
              <li>
                <a href="/lostpet">Lost Pets</a>
              </li>
              <li>
                <a href="/adopt">Adopt Pets</a>
              </li>
            </>
          ) : (
            <>
              <li>
                <a href="/services">Services</a>
              </li>
              <li>
                <a href="/faqs">FAQs</a>
              </li>
              <li>
                <a href="/signup">Sign Up</a>
              </li>
              <li>
                <a href="/login">Log In</a>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
}
