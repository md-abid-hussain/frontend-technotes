import { useParams } from "react-router-dom"
import EditUserForm from "./EditUserForm"
import { useGetUsersQuery } from "./usersApiSlice"
import  PulseLoader  from "react-spinners/PulseLoader"

const EditUser = () => {
  const {id} = useParams()
  const {user} = useGetUsersQuery("usersList",{
    selectFromResult:({data})=>({
      user:data?.entities[id]
    })
  })

  if(!user){
    return <PulseLoader color="#FFF"/>
  }

  const content = <EditUserForm user={user}/>

  return <section className="grid center form_container">{content}</section>
}

export default EditUser