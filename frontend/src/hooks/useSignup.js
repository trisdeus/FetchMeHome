import { useState } from "react";
import { useAuth } from "./useAuth";

export default function useSignup() {
  const { dispatch } = useAuth();
  const [formData, setFormData] = useState({
    name: "",
    tel: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const signup = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/user/signup", {
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
        name: "",
        tel: "",
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

  return { error, loading, signup };
}
