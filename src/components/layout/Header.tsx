import { Menu, X, User, Bell, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, NavLink } from "react-router";
import Sunrise from "@/assets/images/Sunrise-nobg.png";
import { useSelector } from "react-redux";
import type { RootState } from "@/store/store";
import { useState } from "react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const userrole = useSelector((state: RootState) => state.user.user?.role);
  // const userToken = useSelector((state: RootState) => state.user.token);
  const isAdmin = userrole === "admin";
  const isUser = userrole === "user";
  const destination = isAdmin
    ? "/dashboard/admin"
    : isUser
    ? "/dashboard/user"
    : "/login";
  const links = [
    { to: "/", label: "Home" },
    { to: "/hotels", label: "Hotels" },
    { to: "/about", label: "About" },
    { to: "/contact", label: "Contact" },
    { to: { pathname: destination }, label: "Dashboard" },
  ];

  return (
    <header className="left-0 w-full  bg-white/5 backdrop-blur-md  shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <img
              src={Sunrise}
              alt="sunrise-logo"
              className="size-[100px] object-contain"
            />

            <span className="text-xl font-bold  bg-gradient-to-r from-[#ff3c00] to-[#ffb600] bg-clip-text text-transparent">
              SUNRISE
            </span>
          </div>

          {/* Navigation - Desktop */}
          <nav className="hidden md:flex items-center space-x-8 ">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `text-foreground font-medium hover:text-primary transition-all .3s ease-in-out ${
                    isActive
                      ? "underline underline-offset-4 decoration-[#ff3c00]"
                      : ""
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          {/* Right side actions */}
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" className="hidden md:flex">
              <Search className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="hidden md:flex">
              <Bell className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="hidden md:flex">
              <User className="h-4 w-4" />
            </Button>
            <Button className="hidden md:flex  bg-blue-500 hover:bg-blue-600 bg-gradient-to-r from-[#ff3c00] to-[#ffb600]">
              <NavLink to={"/register"}>Sign in</NavLink>
            </Button>

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="h-4 w-4" />
              ) : (
                <Menu className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-border py-4">
            <nav className="flex flex-col space-y-4">
              <a
                href="/"
                className="text-foreground hover:text-primary transition-colors"
              >
                Home
              </a>
              <a
                href="/hotels"
                className="text-foreground hover:text-primary transition-colors"
              >
                Hotels
              </a>
              <a
                href="/about"
                className="text-foreground hover:text-primary transition-colors"
              >
                About
              </a>
              <a
                href="/contact"
                className="text-foreground hover:text-primary transition-colors"
              >
                Contact
              </a>
              <Link
                to={destination}
                className="text-foreground hover:text-primary transition-colors"
              >
                Dashboard
              </Link>
              <Button className="w-full mt-4 bg-blue-500 hover:bg-blue-600">
                Sign In
              </Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
