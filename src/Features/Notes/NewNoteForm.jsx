import {useState,useEffect} from 'react'
import { useAddNewNoteMutation } from './notesApiSlice'
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave } from '@fortawesome/free-solid-svg-icons'

const TITLE_REGEX = /^[A-z0-9 ]{10,40}$/
const TEXT_REGEX = /^[A-z0-9 ]{10,90}$/

const NewNoteForm = ({users}) => {
    const [addNewNote,{
      isLoading,
      isSuccess,
      isError,
      error
    }] = useAddNewNoteMutation()

    const navigate = useNavigate()

    const [title,setTitle] = useState('')
    const [validTitle,setValidTitle] = useState(false)
    const [text,setText] = useState('')
    const [validText,setValidText] = useState(false)
    const [userId,setUserId] = useState('')

    useEffect(()=>{
      setValidTitle(TITLE_REGEX.test(title))
    },[title])

    useEffect(()=>{
      setValidText(TEXT_REGEX.test(text))
    },[text])

    useEffect(()=>{
      if(isSuccess){
        setTitle('')
        setText('')
        navigate('/dash/notes')
      }
    },[isSuccess,navigate])

    const onTitleChange = (e)=>setTitle(e.target.value)
    const onTextChange = (e)=>setText(e.target.value)
    const onUserSelect = (e)=>setUserId(e.target.selectedOptions[0].value)

    const canSave = [validTitle, validText, userId.length].every(Boolean) && !isLoading

    const onSaveNoteClick = async(e)=>{
      e.preventDefault()
      if(canSave){
        await addNewNote({userId,title,text})
      }
    }

    const options = users.map(user=>{
      return (
        <option key={user.id} value={user.id}>{user.username}</option>
      )
    })

    const errClass = isError ? "errmsg" : "offscreen"
    const validTitleClass = !validTitle ? 'form_input-incomplete':''
    const validTextClass = !validText ? 'form_input-incomplete':''
    const validUserSelectClass = !userId.length ? 'form_inpu-incomplete' : ''

    const errorContent = isError ? error?.data?.message || error?.data?.error || error?.error : ''

    const content = (
      <>
        {isError ? <p className={errClass}>{errorContent}</p>:''}
        <form className='form' onSubmit={onSaveNoteClick}>
          <div className="form_title-row">
            <h2>New Note</h2>
          </div>
          <label htmlFor="title" className='form_label'>
            Note Title: <span className='nowrap' >[10-40 chars]</span>
          </label>
          <input
            id="title"
            className={`form_input ${validTitleClass}`}
            type="text" 
            required
            onChange={onTitleChange}
            value={title}
            autoComplete='off'
          />
          <label htmlFor="text">
            Note text: <span className='nowrap'>[10-90 chars]</span>
          </label>
          <textarea
            id="text"
            className={`form_input ${validTextClass}`}
            type='text'
            required
            value={text}
            autoComplete='off'
            onChange={onTextChange}
          ></textarea>
          <label htmlFor="user">Assigned To:</label>
          <select
            name="user"
            id="user"
            className={`form_select ${validUserSelectClass}`}
            value={userId}
            onChange={onUserSelect}
          >
            <option value="">--Select User--</option>
            {options}
          </select>
          <div className="form_action-buttons">
            <button
              className='icon-button'
              title='save'
              disabled={!canSave}
            >
              Save <FontAwesomeIcon icon={faSave}/>
            </button>
          </div>
        </form>
      </>
    )

    return content
}

export default NewNoteForm