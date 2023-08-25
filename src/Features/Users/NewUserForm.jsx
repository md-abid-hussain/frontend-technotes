import {useState,useEffect} from 'react'
import { useAddNewUserMutation } from './usersApiSlice'
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave } from '@fortawesome/free-solid-svg-icons'
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons'
import { ROLE } from '../../config/role'

const USER_REGEX = /^[A-z]{3,20}$/
const PASS_REGEX = /^[A-z0-9!@#$%]{6,12}$/

const NewUserForm = () => {
    const [addNewUser,{
        isLoading,
        isSuccess,
        isError,
        error
    }] = useAddNewUserMutation()

    const navigate = useNavigate()

    const [username,setUsername] = useState('')
    const [validUsername,setValidUsername] = useState(false)
    const [password,setPassword] = useState('')
    const [validPassword,setValidPassword] = useState(false)
    const [role,setRole] = useState(["Employee"])

    useEffect(()=>{
        setValidUsername(USER_REGEX.test(username))
    },[username])

    useEffect(()=>{
        setValidPassword(PASS_REGEX.test(password))
    },[password])

    useEffect(()=>{
        if(isSuccess){
            setUsername('')
            setPassword('')
            setRole([])
            navigate('/dash/users')
        }
    },[isSuccess,navigate])

    const onUsernameChange = (e)=>setUsername(e.target.value)
    const onPasswordChange = (e)=>setPassword(e.target.value)
    const onRoleChange = (e)=>{
        const values = Array.from(
            e.target.selectedOptions,
            (option)=>option.value
        )
        setRole(values)
    }

    const canSave = [role.length,validUsername,validPassword].every(Boolean) && !isLoading

    const onSaveUserClick = async (e)=>{
        e.preventDefault()
        if(canSave){
            await addNewUser({username,password,role})
        }
    }

    const options = Object.values(ROLE).map((role)=>{
        return (
            <option
                key={role}
                value={role}
            >{role}</option>
        )
    })

    const errClass = isError ? "errmsg":"offscreen"
    const validUsernameClass = !validUsername ? 'form_input-incomplete' : ''
    const validPasswordClass = !validPassword ? 'form_input-incomplete':''
    const validRoleClass = !role.length ? 'form_input-incomplete':''

    const errorContent = isError ? error?.data?.error || error?.data?.message || error?.error:"";

    const content = (
        <>
            {isError ? 
                <p className={errClass}>
                    <FontAwesomeIcon icon={faExclamationCircle}/> <span>{errorContent}</span>
                </p>
            :""}
            <form className='form' onSubmit={onSaveUserClick}>
                <div className='form_title-row'>
                    <h2>New User</h2>
                </div>
                <label  className='form_label' htmlFor="username">
                    Username: <span className='nowrap'>[4-20 letters]</span>
                </label>
                <input
                    className={`form_input ${validUsernameClass}`}
                    id="username"
                    name="username"
                    type="text"
                    autoComplete='off'
                    value={username}
                    onChange={onUsernameChange}
                />
                <label className='form_label' htmlFor="password">
                    Password: <span className='nowrap'>[6-12 chars incl. !@#$%]</span>
                </label>
                <input 
                    className={`from_input ${validPasswordClass}`}
                    id="password"
                    name='password'
                    type="password" 
                    value={password}
                    onChange={onPasswordChange}
                />

                <label className='form_label' htmlFor="roles">
                    Assigned Roles:
                </label>
                <select
                    name="role"
                    id="role"
                    className={`form_select ${validRoleClass}`}
                    size={3}
                    value={role}
                    multiple
                    aria-multiselectable
                    onChange={onRoleChange}
                >{options}</select>
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

  return (
    <section className='grid center form_container'>
        {content}
    </section>
  )
}

export default NewUserForm