import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

// Import page components
import Home from "../pages/Home/Home";
import Spacecrafts from "../pages/Spacecrafts/Spacecrafts";
import SpacecraftBuild from "../pages/SpacecraftBuild/SpacecraftBuild";
import Spacecraft from "../pages/Spacecraft/Spacecraft";
import Planets from "../pages/Planets/Planets";

/**
 * Defines the application's routes using React Router.
 *
 * @returns {JSX.Element} The rendered route configuration
 */
function AppRoute() {
  return (
    <Routes>
      {/* Home Page */}
      <Route path="/" element={<Home />} />
      {/* Spacecraft Page */}
      <Route path="/spacecrafts" element={<Spacecrafts />} />
      {/* Build a Spacecraft */}
      <Route path="/spacecraft/build" element={<SpacecraftBuild />} />
      {/* Individual spacecraft page*/}
      <Route path="/spacecraft/:id" element={<Spacecraft />} />
      {/* Planes Page */}
      <Route path="/planets" element={<Planets />} />
      {/* Default route, navigate to home page */}
      <Route path="*" element={<Navigate to={"/"} />} />
    </Routes>
  );
}

export default AppRoute;
