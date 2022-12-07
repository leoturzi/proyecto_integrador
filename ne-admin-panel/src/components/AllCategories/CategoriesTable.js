import { useState, useEffect } from 'react';
import '../../assets/css/CustomTable.css';
import CategoryTableRow from './CategoryTableRow';
function UserTable() {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:3033/api/products/`)
            .then((response) => response.json())
            .then((parsedResponse) => {
                setCategories(parsedResponse.countByCategories);
            });
    }, []);
    return (
        <div className='custom-table__container'>
            <table className='product-table custom-table'>
                <thead>
                    <tr>
                        <th>Categoria</th>
                        <th>Cantidad de Productos por Categoria</th>
                    </tr>
                </thead>
                <tbody>
                    {Object.keys(categories).map((category, i) => (
                        <CategoryTableRow
                            key={i}
                            category={category}
                            categoryCount={categories[category]}
                        />
                    ))}
                </tbody>
                <tfoot>
                    <tr>
                        <th>Categoria</th>
                        <th>Cantidad de Productos por Categoria</th>
                    </tr>
                </tfoot>
            </table>
        </div>
    );
}

export default UserTable;
