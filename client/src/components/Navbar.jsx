import { Link, useLocation } from "react-router-dom";

function Navbar() {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("role");

    window.location.href = "/login";
  };

  const linkStyle = (path) =>
    `transition-all duration-300 px-4 py-2 rounded-lg ${
      location.pathname === path
        ? "bg-white text-blue-700 font-semibold shadow-md"
        : "text-white hover:bg-white/10"
    }`;

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-md bg-slate-900/90 border-b border-slate-700 shadow-lg">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="flex justify-between items-center h-20">
          
          {/* Logo Section */}
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-400 flex items-center justify-center text-white text-xl font-bold shadow-lg">
              LF
            </div>

            <div>
              <h1 className="text-white text-xl md:text-2xl font-bold">
                Lost & Found Portal
              </h1>

              <p className="text-slate-400 text-xs">
                Reconnect people with their belongings
              </p>
            </div>

            {role === "admin" && (
              <span className="ml-2 bg-red-500 text-white text-xs px-3 py-1 rounded-full font-semibold">
                ADMIN
              </span>
            )}
          </div>

          {/* Navigation */}
          <div className="flex items-center gap-2 md:gap-3 text-sm md:text-base">
            <Link to="/" className={linkStyle("/")}>
              Home
            </Link>

            {!token ? (
              <>
                <Link
                  to="/login"
                  className={linkStyle("/login")}
                >
                  Login
                </Link>

                <Link
                  to="/register"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg transition-all duration-300 shadow-md"
                >
                  Register
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/post-item"
                  className={linkStyle("/post-item")}
                >
                  Post Item
                </Link>

                <Link
                  to="/dashboard"
                  className={linkStyle("/dashboard")}
                >
                  Dashboard
                </Link>

                {role === "admin" && (
                  <Link
                    to="/admin"
                    className={linkStyle("/admin")}
                  >
                    Admin
                  </Link>
                )}

                <button
                  onClick={handleLogout}
                  className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-lg transition-all duration-300 shadow-md cursor-pointer"
                >
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;