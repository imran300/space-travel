import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./NavigationBar.module.css";

/**
 * NavigationBar component for displaying navigation links.
 *
 * @returns {JSX.Element} The rendered NavigationBar component.
 */
function NavigationBar() {
  // Define the navigation routes
  const routes = [
    { to: "/", text: "🌎 Home" },
    { to: "/spacecrafts", text: "🚀 Spacecrafts" },
    { to: "/planets", text: "🪐 Planets" },
  ];

  return (
    <nav className={styles["navigation"]}>
      {routes.map((route, index) => (
        <NavLink
          key={index}
          // Set the CSS classes based on the route's active status
          className={({ isActive, isPending }) =>
            `${styles["navigation__item"]} ${
              isActive ? styles["navigation__item--active"] : ""
            }`
          }
          to={route.to}
        >
          {route.text}
        </NavLink>
      ))}
    </nav>
  );
}

export default NavigationBar;
