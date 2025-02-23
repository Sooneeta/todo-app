export const Loader = () => {
  return (
    <div className="loader">
      <span
        style={{ color: "grey", fontSize: "1.1rem", fontFamily: "sans-serif" }}
      >
        Loading
      </span>
      <div className="spinner"></div>
    </div>
  );
};
