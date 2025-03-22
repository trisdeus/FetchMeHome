import { useState } from "react";
import { useLogin } from "../hooks/useLogin";
import Button from "../components/button";

export default function Login() {
  const [formData, setFormData] = useState({
    identifier: "",
    password: "",
  });
  const { error, loading, login } = useLogin();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(formData);
  };

  return (
    <>
      <main>
        <div className="form-container">
          <div className="form-header">
            <h2>Login</h2>
            <p>Enter your credentials to sign in.</p>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="identifier">Email or Phone Number:</label>
              <input
                type="text"
                id="identifier"
                name="identifier"
                className="text-input"
                value={formData.identifier}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                id="password"
                name="password"
                className="text-input"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            <Button
              type="submit"
              text="Login"
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
