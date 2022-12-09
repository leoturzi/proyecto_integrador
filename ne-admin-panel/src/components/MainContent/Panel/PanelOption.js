import { Link } from "react-router-dom";
function PanelOption({url, altText, title, logo}) {
  return (
    <div className="panel__option">
      <div className="mc-img__container">
        <Link to={url}>
          <img src={logo} alt={altText} className="mc-img" />
        </Link>
      </div>
      <h2>{title}</h2>
    </div>
  );
}

export default PanelOption;
