import { useState } from "react";
import { useAuth } from "./useAuth";

export default function useLogin() {
  const { dispatch } = useAuth();
  const [formData, setFormData] = useState({
    id: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const login = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error);
        setLoading(false);
        return;
      }

      localStorage.setItem("token", data.token);
      dispatch({ type: "LOGIN", payload: data });
      setFormData({
        email: "",
        password: "",
      });
      setError(null);
      setLoading(false);
      window.location.href = "/";
    } catch (err) {
      console.error(err);
      setError("An unexpected error occurred.");
      setLoading(false);
    }
  };

  return { error, loading, login };
}
