import "../Auth.css";

const LogoAndName = () => {
  return (
    <>
      <div className="auth-bgcolor">
        <div style={{ marginTop: 300 }}>
          <img src="favicon.ico" alt="..." width={50} />
          <h1>tasktagram</h1>
          <div style={{ display: "flex" }}>
            <div className="small-circle"></div>
            <div className="small-circle"></div>
            <div className="small-circle"></div>
            <div className="small-circle"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LogoAndName;
