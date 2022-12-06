import '../../assets/css/CustomTable.css'
import {useState, useEffect} from 'react'
import ProductTableRow from './ProductTableRow';
function ProductTable(){
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:3033/api/products/`)
        .then(response => response.json())
        .then(parsedResponse =>{
            setProducts(parsedResponse.products)
        })
    }, [])

    return(
        <div className="custom-table__container">
            <table className="product-table custom-table">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Nombre</th>
                        <th>Precio</th>
                        <th>Marca</th>
                        <th>Categoria</th>
                        <th>Stock</th>
                    </tr>
                </thead>
                <tbody>
                {products.map((product, i) => (
                    <ProductTableRow
                    key={i + product.id}
                    id={product.id}
                    name={product.name}
                    brand={product.brand}
                    category={product.category}
                    price={product.price}
                    stock={product.stock}
                    />
                ))}
                </tbody>
                <tfoot>
                    <tr>
                        <th>Id</th>
                        <th>Nombre</th>
                        <th>Precio</th>
                        <th>Marca</th>
                        <th>Categoria</th>
                        <th>Stock</th>
                    </tr>
                </tfoot>
            </table>
        </div>
    )
}

export default ProductTable;