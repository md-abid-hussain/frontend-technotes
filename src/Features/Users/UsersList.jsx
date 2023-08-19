import { useGetUsersQuery } from "./usersApiSlice"
import User from "./User";

const UsersList = () => {

  const {
    data:users,
    isLoading,
    isSuccess,
    isError,
    error
  } = useGetUsersQuery()

  let content;

  if (isLoading) content=<p>Loading...</p>
  
  if(isError){
    content = <p className="errMsg">{error?.error}</p>
  }

  if (isSuccess){
    const {ids} = users

    const tableContent = ids?.length
        ? ids.map(userId=> <User key={userId} userId={userId}/>)
        : null

    content = (
      <table className="table table_users">
        <thead className="table_head">
          <tr>
            <th scope="col" className="table_th user_username">Username</th>
            <th scope="col" className="table_th user_roles">Roles</th>
            <th scope="col" className="table_th user_edit">Edit</th>
          </tr>
        </thead>
        <tbody>
          {tableContent}
        </tbody>
      </table>
    )
  }

  return (
    <section>
      {content}
    </section>
  )
}

export default UsersList