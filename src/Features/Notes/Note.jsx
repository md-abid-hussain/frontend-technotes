import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useGetNotesQuery } from "./notesApiSlice";
import {memo} from 'react'

const Note = ({noteId}) => {

    const {note} = useGetNotesQuery("notesList",{
        selectFromResult:({data})=>({
            note:data?.entities[noteId]
        }),
    })

    const navigate = useNavigate()

    if(note){
        const created = new Date(note.createdAt).toLocaleDateString('en-US',{day:'numeric',month:'long'})

        const updated = new Date(note.updatedAt).toLocaleDateString('en-US',{day:'numeric',month:'long'})

        const handleEdit = ()=>navigate(`/dash/notes/${noteId}`)

        return (
            <tr className="table_row">
                <td className="table_cell note_status">
                    {note.completed
                        ? <span className="note_status-completed ">Completed</span>
                        : <span className="note_status-open">Open</span>
                    }
                </td>
                <td className="table_cell note_created">{created}</td>
                <td className="table_cell note_updated">{updated}</td>
                <td className="table_cell note_title">{note.title}</td>
                <td className="table_cell note_username">{note.username}</td>

                <td className="table_cell">
                    <button onClick={handleEdit}
                    className="icon_button table_button">
                        <FontAwesomeIcon icon={faPenToSquare}/>
                    </button>
                </td>
            </tr>
        )
    }else{
        return null
    }

    
}

const memoizedNote = memo(Note)

export default memoizedNote