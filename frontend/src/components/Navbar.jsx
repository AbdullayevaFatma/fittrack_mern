import { Link } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import { useLogout } from "../hooks/useLogout";

const Navbar = () => {
  const { user } = useAuthContext();
  const { logout } = useLogout();

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-20 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="group">
            <h1 className="text-3xl font-bold tracking-tight text-text">
              Fit
              <span className="text-primary group-hover:text-primary-hover transition">
                Track
              </span>
            </h1>
          </Link>

          {/* Navigation */}
          <nav className="flex items-center gap-6">
            {/* User Area */}
            {user && (
              <div className="hidden sm:flex items-center gap-4">
                <span className="text-sm text-text-muted">{user.email}</span>

                <button
                  onClick={logout}
                  className="
                  rounded-button
                  border border-border
                  px-4 py-2
                  text-sm
                  text-text
                  hover:bg-surface
                  hover:border-primary
                  hover:text-primary
                  transition
      "
                >
                  Log out
                </button>
              </div>
            )}

            {/* Auth Links */}
            {!user && (
            <div className="flex items-center gap-3">
              <Link
                to="/login"
                className="
                  px-4 py-2
                  rounded-button
                  text-sm
                  text-text-muted
                  hover:text-primary
                "
              >
                Login
              </Link>

              <Link
                to="/signup"
                className="
                  px-5 py-2
                  rounded-button
                  bg-primary
                  text-black
                  font-semibold
                  hover:bg-primary-hover
                  hover:scale-105
                "
              >
                Sign up
              </Link>
            </div>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
