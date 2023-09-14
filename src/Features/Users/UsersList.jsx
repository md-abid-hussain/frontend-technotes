import { useGetUsersQuery } from "./usersApiSlice"
import User from "./User";
import  PulseLoader  from "react-spinners/PulseLoader"

const UsersList = () => {

  const {
    data:users,
    isLoading,
    isSuccess,
    isError,
    error
  } = useGetUsersQuery('usersList',{
    pollingInterval:60000,
    refetchOnFocus:true,
    refetchOnMountOrArgChange:true
  })

  let content;

  if (isLoading) content=<PulseLoader color="#FFF"/>
  
  if(isError){
    content = <p className="errmsg">{error?.data.message}</p>
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