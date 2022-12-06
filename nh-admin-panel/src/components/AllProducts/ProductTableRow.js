function ProductTableRow({id, name, price, category, brand, stock}){

    const toThousand = (n) => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');

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