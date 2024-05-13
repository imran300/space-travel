import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

import styles from "./SpacecraftBuild.module.css";

// Import context and services
import { LoadingContext } from "../../context/LoadingProvider";
import SpaceTravelApi from "../../services/SpaceTravelApi";

/**
 * SpacecraftBuild component allows users to create new spacecraft.
 *
 * @returns {JSX.Element} The rendered SpacecraftBuild component.
 */
function SpacecraftBuild() {
  const INITIAL_SPACECRAFT = {
    name: "",
    capacity: "",
    description: "",
    pictureUrl: "",
  };
  const [spacecraft, setSpacecraft] = useState(INITIAL_SPACECRAFT);
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();
  const { enableLoading, disableLoading } = useContext(LoadingContext);

  /**
   * Handles changes in form input values.
   *
   * @param {Event} event - The input change event.
   */
  function handleChangeOfFormInput(event) {
    const { name, value } = event.target;

    setSpacecraft((prevSpacecraft) => ({
      ...prevSpacecraft,
      [name]: value,
    }));
  }

  /**
   * Handles form submission.
   *
   * @param {Event} event - The form submission event.
   */
  async function handleSubmitOfForm(event) {
    event.preventDefault();

    let { name, capacity, description, pictureUrl } = spacecraft;

    let isFormError = false;
    setErrors([]);

    if (name.length === 0) {
      isFormError = true;
      setErrors((prevErrors) => [...prevErrors, "Name is required!"]);
    }

    if (!capacity) {
      isFormError = true;
      setErrors((prevErrors) => [...prevErrors, "Capacity is required!"]);
    }

    capacity = Number(capacity);
    if (!Number.isInteger(capacity)) {
      isFormError = true;
      setErrors((prevErrors) => [
        ...prevErrors,
        "Capacity should be an integer number!",
      ]);
    }

    if (!description) {
      isFormError = true;
      setErrors((prevErrors) => [...prevErrors, "Description is required!"]);
    }

    if (!isFormError) {
      enableLoading();
      const { isError } = await SpaceTravelApi.buildSpacecraft({
        name,
        capacity,
        description,
        pictureUrl,
      });
      if (!isError) {
        setSpacecraft(INITIAL_SPACECRAFT);
      }
      disableLoading();
    }
  }

  /**
   * Handles the click event to navigate back.
   *
   * @param {Event} event - The click event.
   */
  function handleClickOfBack(event) {
    navigate(-1);
  }

  return (
    <>
      {/* Back button */}
      <button className={styles["button__back"]} onClick={handleClickOfBack}>
        Back 👈
      </button>
      <div>
        {/* Spacecraft build form */}
        <form onSubmit={handleSubmitOfForm}>
          <div className={styles["form"]}>
            <div className={styles["form__inputs"]}>
              <div className={styles["form__inputContainer"]}>
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  value={spacecraft.name}
                  onChange={handleChangeOfFormInput}
                  autoComplete="off"
                />
              </div>

              <div className={styles["form__inputContainer"]}>
                <input
                  type="text"
                  name="capacity"
                  placeholder="Capacity"
                  value={spacecraft.capacity}
                  onChange={handleChangeOfFormInput}
                  autoComplete="off"
                />
              </div>

              <div className={styles["form__inputContainer"]}>
                <textarea
                  name="description"
                  placeholder="Description"
                  value={spacecraft.description}
                  onChange={handleChangeOfFormInput}
                />
              </div>

              <div className={styles["form__inputContainer"]}>
                <input
                  type="text"
                  name="pictureUrl"
                  placeholder="Picture URL"
                  value={spacecraft.pictureUrl}
                  onChange={handleChangeOfFormInput}
                  autoComplete="off"
                />
              </div>
            </div>

            <div className={styles["submitContainer"]}>
              <div className={styles["errorContainer"]}>
                {/* Display form errors */}
                {errors.map((error, index) => (
                  <div key={index} className={styles["error"]}>
                    {error}
                  </div>
                ))}
              </div>

              <div className={styles["button__submit"]}>
                {/* Submit button */}
                <button type="submit" onClick={handleSubmitOfForm}>
                  Build 🏗️
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default SpacecraftBuild;
