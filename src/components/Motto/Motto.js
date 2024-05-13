import styles from "./Motto.module.css";

/**
 * Motto component displays a motivational message along with emojis.
 */
function Motto() {
  return (
    <div className={styles["motto"]}>
      {/* Displaying the motto text */}
      <span className={styles["motto__text"]}>
        The solar system: the new home.
      </span>

      {/* Displaying relevant emojis */}
      <span className={styles["motto__emojis"]}>🌎🚀🧑‍🚀🪐</span>
    </div>
  );
}

export default Motto;
