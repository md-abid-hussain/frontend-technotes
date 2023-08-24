/* eslint-disable react/prop-types */
import {useState,useEffect} from 'react'
import { useUpdateUserMutation, useDeleteUserMutation } from './usersApiSlice'
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave,faTrashCan } from '@fortawesome/free-solid-svg-icons'
import { ROLE } from '../../config/role'

const USER_REGEX = /^[A-z]{3,20}$/
const PASS_REGEX = /^[A-z0-9!@#$%]{6,12}$/

const EditUserForm = ({user}) => {
    const [ updateUser,{
        isLoading,
        isSuccess,
        isError,
        error
    }] = useUpdateUserMutation()

    const [ deleteUser,{
        isSuccess:isDelSuccess,
        isError:isDelError,
        error:delError
    }] = useDeleteUserMutation()
    
    const navigate = useNavigate()

    const [username,setUsername] = useState(user.username)
    const [validUsername,setValidUsername] = useState(false)
    const [password,setPassword] = useState('')
    const [validPassword,setValidPassword] = useState(false)
    const [role,setRole] = useState(user.role)
    const [active,setActive] = useState(user.active)

    useEffect(()=>{
        setValidUsername(USER_REGEX.test(username))
    },[username])
    
    useEffect(()=>{
        setValidPassword(PASS_REGEX.test(password))
    },[password])

    useEffect(()=>{
        if(isSuccess || isDelSuccess){
            setUsername('')
            setPassword('')
            setRole([])
            navigate('/dash/users')
        }
    },[isSuccess,isDelSuccess,navigate])

    const onUsernameChange = (e)=>setUsername(e.target.value)
    const onPasswordChange = (e)=>setPassword(e.target.value)

    const onRoleChange = (e)=>{
        const values = Array.from(
            e.target.selectedOptions,
            (option)=>option.value
        )
        setRole(values)
    }

    const onActiveChange = ()=>setActive((prev)=>!prev)

    const onSaveUserClick= async ()=>{
        if(password){
            await updateUser({id:user.id, username,password,role,active})
        }else{
            await updateUser({id:user.id,username,role,active})
        }
    }

    const onDeleteUserClick = async ()=>{
        await deleteUser({id:user.id})
        
    }

    let canSave;

    if (password){
        canSave = [role.length, validUsername, validPassword].every(Boolean) && !isLoading
    }else{
        canSave = [role.length, validUsername].every(Boolean) && !isLoading
    }

    const errClass = (isError || isDelError) ? "errmsg":""
    const validUsernameClass = !validUsername ? "form_input-incomplete":""
    const validPasswordClass = !validPassword ? "form_input-incomplete":""
    const validRoleClass = !role.length ? "form_input-incomplete":""

    const errContent = (error?.message || delError?.message || error?.error) ?? ""

    const options = Object.values(ROLE).map((role)=>{
        return (
            <option
                key={role}
                value={role}
            >{role}</option>
        )
    })

    const content = (
        <>
            <p className={errClass}>{errContent}</p>
            
            <form className='form' onSubmit={(e)=>e.preventDefault()}>
                <div className="form_title-row">
                    <h2>Edit User</h2>
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
                <label htmlFor="user-active" className='form_label form_checkbox-container'>
                    <span>ACTIVE:</span> 
                    <input
                        className='form_checkbox'
                        id='user-active'
                        name='user-active'
                        type="checkbox"
                        checked={active}
                        onChange={onActiveChange}
                    />
                </label>
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
                            title='Save'
                            onClick={onSaveUserClick}
                            disabled={!canSave}
                        >
                            Save <FontAwesomeIcon icon={faSave}/>
                        </button>
                        <button
                            className='icon-button'
                            title='Delete'
                            onClick={onDeleteUserClick}
                        >
                            Delete <FontAwesomeIcon icon={faTrashCan}/>
                        </button>
                    </div>
            </form>
        </>
    )

    return content
    

}

export default EditUserForm