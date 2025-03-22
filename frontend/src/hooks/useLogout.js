import { useAuth } from "./useAuth";

export const useLogout = () => {
  const { dispatch } = useAuth();

  const logout = () => {
    dispatch({ type: "LOGOUT" });
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return { logout };
};
