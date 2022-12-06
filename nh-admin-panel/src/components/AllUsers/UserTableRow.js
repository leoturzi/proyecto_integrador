function UserTableRow({id, first_name, last_name, email}){
    return(
        <tr>
            <td>{id}</td>
            <td className="--capitalized">{first_name.toLowerCase()}</td>
            <td className="--capitalized">{last_name.toLowerCase()}</td>
            <td>{email}</td>
        </tr>
    )
}
export default UserTableRow;