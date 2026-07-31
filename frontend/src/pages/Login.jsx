import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginRequest } from "../api/authApi";
import { useLogin } from "../hooks/useLogin";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const { login, loading, error } = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await login(email, password);

    if (response) {
      navigate("/");
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="
          w-full
          max-w-md
          bg-surface
          border
          border-border
          rounded-card
          p-8
          shadow-card
          space-y-6
        "
      >
        <div className="text-center">
          <h3
            className="
              text-3xl
              font-bold
              text-text
            "
          >
            Welcome Back
          </h3>

          <p
            className="
              mt-2
              text-text-muted
            "
          >
            Login to continue your fitness journey
          </p>
        </div>

        {/* Email */}

        <div className="space-y-2">
          <label className="text-sm text-text-muted">Email Address</label>

          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="example@email.com"
            className="
              w-full
              bg-background
              border
              border-border
              rounded-input
              px-4
              py-3
              text-text
              placeholder:text-text-muted
              focus:border-primary
              transition
            "
          />
        </div>

        {/* Password */}

        <div className="space-y-2">
          <label className="text-sm text-text-muted">Password</label>

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="********"
            className="
              w-full
              bg-background
              border
              border-border
              rounded-input
              px-4
              py-3
              text-text
              placeholder:text-text-muted
              focus:border-primary
              transition
            "
          />
        </div>
        {error && <p className="text-danger text-sm">{error}</p>}
        <button
          disabled={loading}
          className="
            w-full
            bg-primary
            text-black
            font-bold
            py-3
            rounded-button
            hover:bg-primary-hover
            hover:scale-[1.02]
            transition
          "
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <p className="text-center text-sm text-text-muted">
          Don't have an account?
          <Link
            to="/signup"
            className="
              ml-2
              text-primary
              hover:text-primary-hover
              font-semibold
            "
          >
            Sign up
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
