import PropTypes from "prop-types";
import "../App.css";
import taskIcon from "../assets/images/task.svg";
import "../styles/components.css";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import BackIcon from "../assets/images/backward.svg";

const Layout = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const pathname = location.pathname;
  const [showBackButton, setShowBackButton] = useState(false);

  useEffect(() => {
    if (pathname.includes("add") || pathname.includes("edit")) {
      setShowBackButton(true);
    } else {
      setShowBackButton(false);
    }
  }, [pathname, setShowBackButton]);
  return (
    <div className="layout-container">
      <section className="header-section">
        <h1>Todo App</h1>
        <img src={taskIcon} alt="task-image" className="task-icon" />
      </section>
      <section className="body-section">
        {showBackButton && (
          <button className="back-button" onClick={() => navigate("/")}>
            <img src={BackIcon} alt="task-image" className="back-icon" />
            Back
          </button>
        )}
        {children}
      </section>
      <section className="footer-section">
        <p>&copy; {new Date().getFullYear()} Todo App. All rights reserved</p>
      </section>
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.any,
};

export default Layout;
