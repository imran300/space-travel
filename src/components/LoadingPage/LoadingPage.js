import { useState, useEffect } from "react";

import styles from "./LoadingPage.module.css";

/**
 * Loading component displays a loading animation with progressing dots.
 */
function Loading() {
  const [dots, setDots] = useState([]);

  useEffect(() => {
    // Add a dot every 200 milliseconds, up to a maximum of 5 dots.
    setTimeout(() => {
      if (dots.length < 5) {
        setDots((prevDots) => [...prevDots, "."]);
      }
    }, 200);
  }, [dots]);

  return (
    <div className={styles["loading"]}>
      {/* Display loading text */}
      <span>Loading</span>

      {/* Display progressing dots */}
      {dots.map((dot, index) => (
        <span key={index}>{dot}</span>
      ))}
    </div>
  );
}

export default Loading;
