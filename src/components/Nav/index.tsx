import state from "../../store";

const Nav = () => {
  return (
    <div className="nav-container">
      <div id="nav" className="nav">
        {new Array(state.sections).fill(null).map((_, index) => (
          <a href={"#0" + index} key={"link-" + index} className="nav-item">
            {" "}
          </a>
        ))}
      </div>
    </div>
  );
};

export default Nav;
