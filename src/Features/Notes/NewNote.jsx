import { useSelector } from "react-redux"
import {selectAllUsers} from '../Users/usersApiSlice'
import NewNoteForm from './NewNoteForm'


const NewNote = () => {
    const users = useSelector(selectAllUsers)

    const content = users? <NewNoteForm users={users}/> : <p>Loading...</p>

    return(
        <section className="grid center form_container">
            {content}
        </section>
    )
}

export default NewNote