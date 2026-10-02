import { createContext, useEffect, useState } from "react";
import { getMe, userRegister } from "../api/auth";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authMessage, setAuthMessage] = useState({
    message: "",
    type: "",
  });

  const register = async (data) => {
    try {
      const res = await userRegister(data);
      setUser(res.data.user);
      localStorage.setItem("token", res.data.token);
    } catch (error) {
      setAuthMessage({
        type: "error",
        message: error.response.data.message || "Something went wrong",
      });
    }
  };

  const getMeUser = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      setUser(null);
      setLoading(false);
      return;
    }
    try {
      const res = await getMe(token);
      setUser(res.data.user);
    } catch (error) {
      setAuthMessage({
        type: "error",
        message: error.response.data.message || "Something went wrong",
      });

      localStorage.removeItem("token");
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getMeUser();
  }, []);

  return (
    <AuthContext.Provider value={{ register, getMeUser, authMessage, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
