import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
type PublicRouteProps = {
  children: React.ReactNode;
};
const PublicRoute: React.FC<PublicRouteProps> = ({ children }) => {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!token) {
      navigate("/");
      setLoading(false);
      return;
    } else {
      navigate("/users");

      setLoading(false);
      return;
    }
  }, [token, navigate]);

  if (loading) {
    return (
      <div className="flex justify-center">
        <p className="text-2xl text-midnight font-semibold mt-10">Loading...</p>
      </div>
    );
  }

  return children;
};

export default PublicRoute;
