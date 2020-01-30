import React from 'react'
import {Link} from 'react-router-dom'
import {users} from './data.json'

//유저 목록 페이지 렌더링
function UserList({match}) {
    return(
        <>
            <h2>User List</h2>
            <ul>
                {users.map(({id, name}) => (
                    <li key = {id}>
                        <Link to = {`${match.url}/${id}`}>{name}</Link>
                    </li>
                ))}
            </ul>
        </>
    )
}

export default UserList