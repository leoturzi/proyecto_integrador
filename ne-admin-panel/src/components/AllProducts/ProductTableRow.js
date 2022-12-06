import toThousand from '../../assets/utils/toThousand';
function ProductTableRow({id, name, price, category, brand, stock}){

    return(
        <tr>
            <td>{id}</td>
            <td className="--capitalized">{name.toLowerCase()}</td>
            <td className="--nowrapping">$ {toThousand(price)}</td>
            <td>{brand}</td>
            <td className="--capitalized">{category}</td>
            <td>{stock}</td>
        </tr>
    )
}
export default ProductTableRow;