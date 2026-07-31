import { useState } from "react";
import { signupRequest } from "../api/authApi";
import { useAuthContext } from "./useAuthContext";

export const useSignup = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const { dispatch } = useAuthContext();

  const signup = async (email, password) => {
    setLoading(true);
    setError(null);

    try {
      const response = await signupRequest(email, password);

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

      setError(error.response?.data?.error || "Something went wrong");

      return null;
    }
  };

  return {
    signup,
    loading,
    error,
  };
};
