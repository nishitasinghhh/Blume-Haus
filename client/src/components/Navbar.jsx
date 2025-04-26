import React from "react";
import { FiLogOut } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    axios.get('http://localhost:3001/logout', { withCredentials: true })
      .then(res => {
        if (res.data.status === "success") {
          navigate('/login');
        }
      })
      .catch(err => console.log(err));
  };

  return (
    <nav style={styles.nav}>
      <div style={styles.left}>
        <h2 style={{ margin: 0 }}>PlantCare</h2>
      </div>
      <div style={styles.right}>
        <FiLogOut size={24} style={{ cursor: "pointer" }} onClick={handleLogout} />
      </div>
    </nav>
  );
};

const styles = {
  nav: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px 30px",
    backgroundColor: "#4CAF50", // Light green navbar
    color: "white",
  },
  left: {
    fontWeight: "bold",
    fontSize: "24px",
  },
  right: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
};

export default Navbar;
