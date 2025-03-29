import { useState, useEffect } from "react";

const useToken = () => {
  const [token, setToken] = useState<string | null>(() =>
    localStorage.getItem("token")
  );

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    setToken(storedToken);
  }, []);

  const saveToken = (newToken: string) => {
    localStorage.setItem("token", newToken);
    setToken(newToken);
  };

  const removeToken = () => {
    localStorage.removeItem("token");
    setToken(null);
  };

  return { token, saveToken, removeToken };
};

export default useToken;
