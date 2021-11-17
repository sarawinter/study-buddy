import React from "react";
import styles from "./App.module.css";
import StudyVideo from "./Components/StudyVideo/Container/StudyVideo";
import Header from "./Components/Layout/Container/Header";
import Timer from "./Components/Timer/Container.tsx/Timer";

function App() {
  return (
    <div className={styles.app}>
      <div className={styles.headerContainer}>
        <Header />
      </div>
      <div className={styles.contentContainer}>
        <h1>Study Session - ASMR with Eira</h1>
        <StudyVideo />
        <Timer />
      </div>
    </div>
  );
}

export default App;
