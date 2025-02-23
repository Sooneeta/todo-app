export const Loader = () => {
  return (
    <div className="loader">
      <span
        style={{ color: "grey", fontSize: "1.4rem", fontFamily: "Gilroy-Bold" }}
      >
        Loading
      </span>
      <div className="spinner"></div>
    </div>
  );
};
