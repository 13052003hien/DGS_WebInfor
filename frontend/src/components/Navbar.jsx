import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { getCurrentUser, logout } from "../services/auth.service";
import logo from "../assets/logo.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const user = getCurrentUser();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { title: "Trang chủ", path: "/" },
    // { title: "Dịch vụ", path: "/services" },
    { title: "Dự án", path: "/projects" },
    { title: "Giới thiệu", path: "/about" },
    // { title: "Liên hệ", path: "/contact" },
  ];

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled || location.pathname !== "/"
          ? "bg-white shadow-md"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4">
        {" "}
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0">
            <img src={logo} alt="DigiSER Logo" className="h-16 w-auto" />
          </Link>
          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`text-base font-medium transition-colors duration-200 px-4 py-2 ${
                  location.pathname === item.path
                    ? "text-blue-600"
                    : scrolled || location.pathname !== "/"
                    ? "text-gray-700 hover:text-blue-600"
                    : "text-white hover:text-blue-200"
                }`}
              >
                {item.title}
              </Link>
            ))}
          </div>
          {/* User Menu */}
          <div className="hidden lg:flex items-center space-x-4">
            {user ? (
              <>
                <Link to="/profile" className="flex items-center space-x-2">
                  {" "}
                  <div className="h-10 w-10 rounded-full overflow-hidden">
                    {user.imageUrl ? (
                      <img
                        src={user.imageUrl}
                        alt={user.fullName}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div
                        className={`h-full w-full flex items-center justify-center bg-blue-600 text-white text-sm font-medium ${
                          scrolled || location.pathname !== "/"
                            ? "text-white"
                            : ""
                        }`}
                      >
                        {user.fullName.charAt(0).toUpperCase()}
                      </div>
                    )}
                  </div>{" "}
                  <span
                    className={`text-base font-medium ${
                      scrolled || location.pathname !== "/"
                        ? "text-gray-700 hover:text-blue-600"
                        : "text-white hover:text-blue-200"
                    }`}
                  >
                    {user.fullName}
                  </span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="px-6 py-3 text-base font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Đăng xuất
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="px-6 py-3 text-base font-medium text-blue-600 border border-blue-600 rounded-md hover:bg-blue-50"
                >
                  Đăng nhập
                </Link>
                <Link
                  to="/register"
                  className="px-6 py-3 text-base font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
                >
                  Đăng ký
                </Link>
              </>
            )}
          </div>
          {/* Mobile Menu Button */}{" "}
          <div className="lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`p-3 rounded-md ${
                scrolled || location.pathname !== "/"
                  ? "text-gray-700 hover:text-blue-600"
                  : "text-white hover:text-blue-200"
              }`}
            >
              <svg
                className="h-8 w-8"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isOpen ? (
                  <path d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
        {/* Mobile Menu */}
        {isOpen && (
          <div className="lg:hidden">
            {" "}
            <div className="px-3 pt-3 pb-4 space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className="block px-4 py-3 text-lg font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md"
                  onClick={() => setIsOpen(false)}
                >
                  {item.title}
                </Link>
              ))}
              {user ? (
                <>
                  <Link
                    to="/profile"
                    className="flex items-center px-4 py-3 text-lg font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md"
                    onClick={() => setIsOpen(false)}
                  >
                    <div className="h-12 w-12 rounded-full overflow-hidden mr-3">
                      {user.imageUrl ? (
                        <img
                          src={user.imageUrl}
                          alt={user.fullName}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="h-full w-full flex items-center justify-center bg-blue-600 text-white text-base font-medium">
                          {user.fullName.charAt(0).toUpperCase()}
                        </div>
                      )}
                    </div>
                    {user.fullName}
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsOpen(false);
                    }}
                    className="w-full text-left px-4 py-3 text-lg font-medium text-red-600 hover:text-red-700 hover:bg-gray-50 rounded-md"
                  >
                    Đăng xuất
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="block px-4 py-3 text-lg font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md"
                    onClick={() => setIsOpen(false)}
                  >
                    Đăng nhập
                  </Link>
                  <Link
                    to="/register"
                    className="block px-4 py-3 text-lg font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md"
                    onClick={() => setIsOpen(false)}
                  >
                    Đăng ký
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
