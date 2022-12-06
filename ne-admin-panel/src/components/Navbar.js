import {Link} from 'react-router-dom';
import nuevaEraLogo from '../assets/images/logo.png';
import './Navbar.css';
function Navbar(){
    return(
        <div className="sidebar">
            <ul>
                <li>
                <div className='logito'>
                    <Link to="/"><img src={nuevaEraLogo} alt="Nueva Era logo" /></Link>
                </div>
                </li>
                <li className='sidebar__item'>
                    <Link to="/allProducts"> <span> Productos</span></Link>
                </li>
                <li className='sidebar__item'>
                    <Link to="/allUsers"><span> Usuarios </span></Link>
                </li>
                <li className='sidebar__item'>
                    <Link to="/statistics"><span> Estadisticas</span> </Link>
                </li>
            </ul>
            
        </div>
    )
}

export default Navbar;