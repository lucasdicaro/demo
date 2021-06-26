import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getAllUsers } from './actions';
import { Link } from 'react-router-dom'

function Home() {
    const dispatch = useDispatch()
    const users = useSelector(state => state.users)
  
    useEffect(() => {
       dispatch(getAllUsers())
    },[dispatch])
 
    return (
        <div>
            <ul>
               {
                   Array.isArray(users) ? users.map(user => (
                    <li key={user.id}>
                    <Link to={`/users/${user.id}`}>{user.name}</Link>
                    </li>
                   )) : <h1>Cargando...</h1>
               }
            </ul>
        </div>
    )
}

export default Home



