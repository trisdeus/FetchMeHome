import React from "react";
import { useAuth } from "../hooks/useAuth";
import Logo from "./logo";

export default function Header() {
  const { isAuthenticated, user } = useAuth();

  return (
    <header>
      <Logo />
      <nav>
        <ul>
          <li>
            <a href="/#services">Services</a>
          </li>
          <li>
            <a href="/#faqs">FAQs</a>
          </li>
          {isAuthenticated ? (
            <>
              <li>
                <a href="/lostpet">Lost Pets</a>
              </li>
              <li>
                <a href="/adopt">Adopt Pets</a>
              </li>
              {/* Dropdown for user profile */}
              <li className="dropdown">
                <div className="dropdown-toggle">
                  <img
                    src={user.profilePic}
                    alt="Profile"
                    className="profile-pic"
                  />
                  <span>{user.name}</span>
                </div>
                <ul className="dropdown-menu">
                  <li>
                    <a href="/findings">View Your Findings</a>
                  </li>
                  <li>
                    <a href="/adoption-requests">View Your Adoption Requests</a>
                  </li>
                  <li>
                    <a href="/adoption-history">View Your Adoption History</a>
                  </li>
                  <li>
                    <a href="/edit-profile">Edit Profile</a>
                  </li>
                  <li>
                    <a href="/change-password">Change Password</a>
                  </li>
                  <li>
                    <a href="/logout">Logout</a>
                  </li>
                  <li>
                    <a href="/delete-account">Delete Account</a>
                  </li>
                </ul>
              </li>
            </>
          ) : (
            <>
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
