/* eslint-disable react/prop-types */
import {useState,useEffect} from 'react'
import {useUpdateNoteMutation, useDeleteNoteMutation} from './notesApiSlice'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave, faTrashCan } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom'

const TITLE_REGEX = /^[A-z0-9 ]{10,40}$/
const TEXT_REGEX = /^[A-z0-9 ]{10,90}$/

const EditNoteForm = ({note,users}) => {
    const [updateNote,{
      isLoading,
      isSuccess,
      isError,
      error
    }] = useUpdateNoteMutation()

    const [deleteNote,{
      isSuccess:isDelSuccess,
      isError:isDelError,
      error:delError
    }] = useDeleteNoteMutation()

    const navigate = useNavigate()

    const [title,setTitle] = useState(note.title)
    const [validTitle,setValidTitle] = useState(TITLE_REGEX.test(title))
    const [text,setText] = useState(note.text)
    const [validText,setValidText] = useState(TEXT_REGEX.test(text))
    const [completed,setCompleted] = useState(Boolean(note.completed))
    const [userId,setUserId] = useState(note.userId)

    useEffect(()=>{
      setValidTitle(TITLE_REGEX.test(title))
    },[title])

    useEffect(()=>{
      setValidText(TEXT_REGEX.test(text))
    },[text])

    useEffect(()=>{
      if(isSuccess || isDelSuccess){
        setTitle('')
        setText('')
        setCompleted(false)
        setUserId('')
        navigate('/dash/notes')
      }
    },[isSuccess,isDelSuccess,navigate])

    const onTitleChange = (e)=>setTitle(e.target.value)
    const onTextChange = (e)=>setText(e.target.value)
    const onCompletedChange = ()=>setCompleted((prev)=>!prev)
    const onUserChange = (e)=>setUserId(e.target.selectedOptions[0].value)

    const onSaveNoteClick = async ()=>{
      await updateNote({id:note.id, title, text, userId,completed})
    }

    const onDeleteNoteClick = async ()=>{
      await deleteNote({id:note.id})
    }

    const canSave = [validTitle,validText,userId.length, typeof completed=='boolean'].every(Boolean) && !isLoading

    const errClass = (isError || isDelError) ? "errmsg":"offscreen"
    const validTitleClass = !validTitle ? "form_input-incomplete":""
    const validTextClass = !validText ? "form_input-incomplete":""

    const errContent = (error?.message || delError?.message || error?.error) ?? ""

    const userOption = users.map((user)=>{
      return (
        <option 
          key={user.id}
          value={user.id}
        >{user.username}</option>
      )
    })

    const content = (
      <>
        <p className={errClass}>{errContent}</p>

        <form className="form" onSubmit={(e)=>e.preventDefault()}>
          <div className="form_title-row">
            <h2>Edit Note</h2>
          </div>

          <label htmlFor="title" className='form_label'>
            Title:
          </label>
          <input
            type="text"
            className={`form_input ${validTitleClass}`}
            id="title"
            value={title}
            onChange = {onTitleChange}
            autoComplete='off'
          />
          <label htmlFor="text" className='form_label'>
            Text:
          </label>
          <textarea
            name="text"
            id="text"
            className={`form_input ${validTextClass}`}
            value={text}
            onChange={onTextChange}
            autoComplete='off'
          ></textarea>
          <label htmlFor="completed" className='form_label form_checkbox-container'>
            Completed:
            <input
              type="checkbox"
              name="completed"
              id="completed"
              value={completed}
              onChange={onCompletedChange}
            />
          </label>
          <label htmlFor="assigned-user">
            Assigned User:
          </label>
          <select
            name="assigned-user"
            id="assigned-user"
            onChange={onUserChange}
            value={userId}
          >
            {userOption}
          </select>
          <div className="form_action-buttons">
            <button
              className='icon-button'
              title='Save'
              onClick={onSaveNoteClick}
              disabled={!canSave}
            >
              Save <FontAwesomeIcon icon={faSave}/>
            </button>
            <button
              className='icon-button'
              title='Delete'
              onClick={onDeleteNoteClick}
            >
              Delete <FontAwesomeIcon icon={faTrashCan}/>
            </button>
          </div>
        </form>
      </>
    )

    return content
}

export default EditNoteForm