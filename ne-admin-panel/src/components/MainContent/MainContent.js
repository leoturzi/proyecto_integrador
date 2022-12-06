import productsLogo from '../../assets/images/guitar.jpg';
import usersLogo from '../../assets/images/users.png';
import statisticsLogo from '../../assets/images/charts.png';
import './MainContent.css';
import {Link} from 'react-router-dom';
import {useState, useEffect} from 'react';
import toThousand from '../../assets/utils/toThousand'
function MainContent(){

  const [lastProduct, setProduct] = useState([]);
  const [lastUser, setLastUser] = useState([]);

  useEffect(()=>{
    fetch(`http://localhost:3033/api/products/last`)
    .then(response => response.json())
    .then(data => {
      if (data.processedProduct) {
        setProduct(data.processedProduct);
      }
    });
    fetch(`http://localhost:3033/api/users/last`)
    .then(response => response.json())
    .then(data => {
      if (data.user) {
        setLastUser(data.user);
      }
    });
  },[])

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
        <div className='mc-container last-items-wrapper'>
          <section className='mc-card last-pc'>
            <div className='mc-card__head'>
              <h1 className='mc-card__title'>Last Product Created</h1>
              <p className='mc-card__text'>{lastProduct.name}</p>
              <p className='mc-card__text'>$ {toThousand(lastProduct.price)}</p>
            </div>
            <div className='mc-card__img-container'>
              <img className='mc-img lp-img' src={lastProduct.url} alt={lastProduct.name}/>
            </div>
          </section>
          {/*Componente ultimo usuario creado */}
          <section className='mc-card last-pc'>
            <div className='mc-card__head mc-card__head--green'>
              <h1 className='mc-card__title'>Last User Registered</h1>
              <p className='mc-card__text'>{lastUser.first_name} {lastUser.last_name}</p>
              <p className='mc-card__text'>{lastUser.email}</p>
            </div>
            <div className='mc-card__img-container'>
              <img className='mc-img lp-img --portrait' src={lastUser.avatarURL} alt={lastUser.name}/>
            </div>
          </section>
        </div>
      </>
    );
}

export default MainContent;