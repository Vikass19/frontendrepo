const DarkModeToggle = ({ toggleDarkMode }) => {
    return (
      <button
        onClick={toggleDarkMode}
        style={{
          padding: "10px 15px",
          backgroundColor: "#f8870e",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Toggle Dark Mode
      </button>
    );
  };

  export default DarkModeToggle;