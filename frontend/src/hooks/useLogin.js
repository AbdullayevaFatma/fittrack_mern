import { useState } from "react";
import { loginRequest } from "../api/authApi";
import { useAuthContext } from "./useAuthContext";

export const useLogin = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const { dispatch } = useAuthContext();

  const login = async (email, password) => {
    setLoading(true);
    setError(null);

    try {
      const response = await loginRequest(email, password);

      dispatch({
        type: "LOGIN",
        payload: {
          user: {
            email: response.data.email,
          },
          accessToken: response.data.accessToken,
        },
      });

      setLoading(false);

      return response;
    } catch (error) {
      setLoading(false);

      setError(error.response?.data?.error || "Login failed");

      return null;
    }
  };

  return {
    login,
    loading,
    error,
  };
};
