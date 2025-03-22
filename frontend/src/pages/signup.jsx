import { useState } from "react";
import { useSignup } from "../hooks/useSignup";
import Button from "../components/button";

export default function SignUp() {
  const [formData, setFormData] = useState({
    name: "",
    tel: "",
    email: "",
    password: "",
  });
  const { error, loading, signup } = useSignup();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signup(formData);
  };

  return (
    <>
      <main>
        <div className="form-container">
          <div className="form-header">
            <h2>Sign Up</h2>
            <p>Create an account to view pet listings.</p>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                className="text-input"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="tel">Phone Number:</label>
              <input
                type="tel"
                className="text-input"
                id="tel"
                name="tel"
                value={formData.tel}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email Address:</label>
              <input
                type="email"
                className="text-input"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                className="text-input"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            <Button
              type="submit"
              text="Sign Up"
              primary="primary"
              color="beige"
              disabled={loading}
            />
            {error && <p className="error">{error}</p>}
          </form>
        </div>
      </main>
    </>
  );
}
