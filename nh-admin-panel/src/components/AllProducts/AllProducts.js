// import {Link} from 'react-router-dom';
import ProductTable from './ProductTable';

function AllProducts(){
    return(
            <div>
                <h1 className="main-title">PANEL DE PRODUCTOS</h1>
                <ProductTable />
                {/* <ul>
                <li>
                    <Link to="/createProduct"><span> Crear </span> </Link>
                </li>
                <li>
                    <Link to="/editProduct"><span> Editar Prod </span> </Link>
                </li>
                <li>
                    <Link to="/deleteProduct"><span> Borrar </span> </Link>
                </li>
                 </ul> */}
            </div>
    )
}

export default AllProducts