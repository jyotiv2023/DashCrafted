import "./navbar.scss";
import profilepic from "../../../public/profile-pic (7).png";
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
const Navbar = () => {
  const navigate = useNavigate();
  const [dropDownOpen, setDropDownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleLogout = () => {
    navigate("/login");
  };
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      // Use type assertion to tell TypeScript that current is of type HTMLElement | null
      if (
        dropdownRef.current &&
        !(dropdownRef.current as HTMLElement).contains(event.target as Node)
      ) {
        setDropDownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [dropdownRef]);
  return (
    <div className="navbar">
      <div className="logo">
        <img src={profilepic} alt="" />
        <span>Jyoti Verma</span>
      </div>
      <div className="icons">
        <img src="/search.svg" alt="" className="icon" />
        <img src="/app.svg" alt="" className="icon" />
        <img src="/expand.svg" alt="" className="icon" />
        <div className="notification">
          <img src="/notifications.svg" alt="" />
          <span>6</span>
        </div>
        <div className="user">
          <span>Admin</span>
        </div>
        <div
          className="icons"
          ref={dropdownRef}
          onClick={() => setDropDownOpen(!dropDownOpen)}
        >
          <img src="/settings.svg" alt="" className="icon" />
          {dropDownOpen && (
            <div className="dropdown">
              <ul>
                <li onClick={() => navigate("/profile")}>Profile</li>

                <li onClick={handleLogout}>Logout</li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
