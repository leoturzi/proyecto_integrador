import productsLogo from '../assets/images/guitar.jpg';
import usersLogo from '../assets/images/users.png';
import statisticsLogo from '../assets/images/charts.png';
import './MainContent.css';
import {Link} from 'react-router-dom';
function MainContent(){
    return (
      <>
        <h1 className="main-title">Panel Principal</h1>
        <section className="mc-container">
          <div className="panel options">
            <div className="panel__option">
              <div className="mc-img__container">
                <Link to="/allProducts">
                <img
                  src={productsLogo}
                  alt="Guitar link to products"
                  className="mc-img"
                />
                </Link>
              </div>
              <h2>Productos</h2>

            </div>

            <div className="panel__option">
              <div className="mc-img__container">
                <Link to="/allUsers">
                <img src={usersLogo} alt="Users icon, link to Users" className="mc-img" />
                </Link>
              </div>
              <h2>Usuarios</h2>

            </div>

            <div className="panel__option">
              <div className="mc-img__container">
              <Link to="/statistics">
                <img
                  src={statisticsLogo}
                  alt="Arrow graph, link to statistics"
                  className="mc-img"
                />
                </Link>
              </div>
              <h2>Estadisticas</h2>
            </div>
          </div>
        </section>
        {/*Componente ultimo producto creado */}
        <section>
          <h1>Last Product Created</h1>
          <p>product name</p>
          <p>product price</p>
          <p>product photo</p>
        </section>
        {/*Componente ultimo usuario creado */}
        <section>
          <h1>Last User Registered</h1>
          <p>User Email</p>
          <p>User Photo</p>
        </section>
      </>
    );
}

export default MainContent;