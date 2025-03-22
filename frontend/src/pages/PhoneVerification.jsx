import React, { useState } from "react";
import Header from "../components/header";
import Button from "../components/button";

export default function PhoneVerification() {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);

  const handleChange = (e) => {
    setOtp(e.target.value);
    setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/phoneVerification", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ otp }),
      });

      const data = await response.json();
      if (!response.ok) {
        setError(data.message || "Invalid OTP. Please try again.");
        return;
      }
      setMessage("Phone verified successfully!");
      // Optionally, redirect the user or update the UI as needed.
    } catch (err) {
      console.error(err);
      setError("An unexpected error occurred. Please try again later.");
    }
  };

  return (
    <>
      <main>
        <div className="form-container">
          <div className="form-header">
            <h2>Phone Verification</h2>
            <p>Please enter the OTP sent to your phone number.</p>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <input
                type="text"
                className="text-input"
                value={otp}
                onChange={handleChange}
                placeholder="Enter OTP"
                required
              />
            </div>
            <Button
              type="submit"
              text="Verify"
              primary="primary"
              color="beige"
            />
            {error && <p className="error">{error}</p>}
            {message && <p className="success">{message}</p>}
          </form>
        </div>
      </main>
    </>
  );
}
