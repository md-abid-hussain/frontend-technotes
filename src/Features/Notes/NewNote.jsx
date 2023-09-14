import NewNoteForm from './NewNoteForm'
import { useGetUsersQuery } from "../Users/usersApiSlice"
import  PulseLoader  from "react-spinners/PulseLoader"

const NewNote = () => {
    const {users} = useGetUsersQuery("usersList",{
        selectFromResult:({data})=>({
          users:data?.ids.map(id=>data?.entities[id])
        })
      })

    if(!users?.length){
        return <PulseLoader color='#FFF' />
    }

    const content = <NewNoteForm users={users}/>

    return(
        <section className="grid center form_container">
            {content}
        </section>
    )
}

export default NewNote