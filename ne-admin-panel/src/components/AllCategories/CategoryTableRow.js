function CategoryTableRow({ category, categoryCount }) {
    return (
        <tr>
            <td className='--capitalized'>{category.toLowerCase()}</td>
            <td>{categoryCount}</td>
        </tr>
    );
}
export default CategoryTableRow;
