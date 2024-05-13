import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import styles from "./Spacecrafts.module.css";

// Import context and services
import { LoadingContext } from "../../context/LoadingProvider";
import SpaceTravelApi from "../../services/SpaceTravelApi";

/**
 * Spacecrafts component displays a list of spacecrafts with options to build, view, and destroy them.
 *
 * @returns {JSX.Element} The rendered Spacecrafts component.
 */
function Spacecrafts() {
  const [spacecrafts, setSpacecrafts] = useState([]);
  const { enableLoading, disableLoading } = useContext(LoadingContext);
  const navigate = useNavigate();

  /**
   * Fetches the list of spacecrafts from the API and updates the state.
   */
  async function getSpacecrafts() {
    const { data: fetchedSpacecrafts, isError } =
      await SpaceTravelApi.getSpacecrafts();
    if (!isError) {
      setSpacecrafts(fetchedSpacecrafts);
    }
  }

  useEffect(() => {
    /**
     * Runs the getSpacecrafts function after enabling loading, then disables loading.
     */
    async function runGetSpacecrafts() {
      enableLoading();
      await getSpacecrafts();
      disableLoading();
    }

    runGetSpacecrafts();
  }, [enableLoading, disableLoading]);

  /**
   * Handles the click event to navigate to the spacecraft build page.
   */
  function handleClickOfBuild() {
    navigate("/spacecraft/build");
  }

  /**
   * Handles the click event to navigate to view the spacecraft details page.
   *
   * @param {Event} event - The click event.
   * @param {string} id - The ID of the spacecraft.
   */
  function handleClickOfImageContainer(event, id) {
    navigate(`/spacecraft/${id}`);
  }

  /**
   * Handles the click event to destroy a spacecraft.
   *
   * @param {Event} event - The click event.
   * @param {string} id - The ID of the spacecraft.
   */
  async function handleClickOfDestroy(event, id) {
    enableLoading();
    const { isError } = await SpaceTravelApi.destroySpacecraftById({ id });
    if (!isError) {
      await getSpacecrafts();
    }
    disableLoading();
  }

  return (
    <div>
      {/* Build a spacecraft button */}
      <button onClick={handleClickOfBuild}>🏗 Build a Spacecraft</button>
      <div>
        {/* List of spacecrafts */}
        {spacecrafts.map((spacecraft, index) => (
          <div key={spacecraft.id} className={styles["spacecraft"]}>
            {/* Spacecraft image container */}
            <div
              className={styles["spacecraft__imageContainer"]}
              onClick={(event) =>
                handleClickOfImageContainer(event, spacecraft.id)
              }
            >
              {spacecraft.pictureUrl ? (
                <img
                  src={spacecraft.pictureUrl}
                  alt={`The spacecraft ${spacecraft.name}`}
                  className={styles["spacecraft__image"]}
                />
              ) : (
                <span className={styles["spacecraft__image--default"]}>🚀</span>
              )}
            </div>

            {/* Spacecraft info container */}
            <div className={styles["spacecraft__infoContainer"]}>
              <div className={styles["spacecraft__info"]}>
                <span>Name: </span>
                <span>{spacecraft.name}</span>
              </div>

              <div className={styles["spacecraft__info"]}>
                <span>Capacity: </span>
                <span>{spacecraft.capacity}</span>
              </div>
            </div>

            {/* Destroy button */}
            <div>
              <button
                onClick={(event) => handleClickOfDestroy(event, spacecraft.id)} className={styles["destroy__spacecraft"]}
              >
                💥 Destroy
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Spacecrafts;
