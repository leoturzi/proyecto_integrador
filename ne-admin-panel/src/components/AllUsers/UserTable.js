import {useState, useEffect} from 'react'
import '../../assets/css/CustomTable.css'
import UserTableRow from './UserTableRow';
function UserTable(){
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:3033/api/users/`)
        .then(response => response.json())
        .then(parsedResponse =>{
            setUsers(parsedResponse.users)
        })
    }, [])
    return(
        <div className="custom-table__container">
            <table className="product-table custom-table">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Nombre</th>
                        <th>Apellido</th>
                        <th>Correo electronico</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user, i) => (
                        <UserTableRow
                        key={i + user.id}
                        id={user.id}
                        first_name={user.first_name}
                        last_name={user.last_name}
                        email={user.email}
                        />
                    ))}
                </tbody>
                <tfoot>
                    <tr>
                        <th>Id</th>
                        <th>Nombre</th>
                        <th>Apellido</th>
                        <th>Correo electronico</th>
                    </tr>
                </tfoot>
            </table>
        </div>
    )
}

export default UserTable;