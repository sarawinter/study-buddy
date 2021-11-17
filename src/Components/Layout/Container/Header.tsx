import React from "react";
import styles from "./Header.module.css";

function Header() {
  return (
    <div className={styles.header}>
      <div className={styles.content}>
        <div className={styles.newSession}>New session</div>
        <div className={styles.boxes}>
          <button>
            <i className="fas fa-user"></i>
          </button>
          <button>
            <i className="fas fa-tasks"></i>
          </button>
          <button>
            <i className="fas fa-clipboard-list"></i>
          </button>
          {/* <i className="fas fa-stopwatch"></i>
          <i className="fas fa-check"></i> */}
        </div>
      </div>
    </div>
  );
}

export default Header;
