import { useContext } from "react";
import { BrowserRouter } from "react-router-dom";

import styles from "./App.module.css";
import { LoadingContext } from "./context/LoadingProvider";
import NavBar from "./components/Navigation/NavBar";
import PageLayout from "./routes/PageLayout";
import Motto from "./components/Motto/Motto";
import Loading from "./components/LoadingPage/LoadingPage";

function App() {
  const { isLoading } = useContext(LoadingContext);
  return (
    <>
      <BrowserRouter basename="/Space-travel">
        <div className={styles["app"]}>
          <header className={styles["app__header"]}>
            <NavBar />
          </header>

          <main className={styles["app___main"]}>
            <PageLayout />
          </main>

          <footer className={styles["app__footer"]}>
            <Motto />
          </footer>
        </div>
      </BrowserRouter>
      {
        isLoading && <Loading />
      }
    </>
  );
}

export default App;
