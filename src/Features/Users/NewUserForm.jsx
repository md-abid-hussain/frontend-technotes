import {useState,useEffect} from 'react'
import { useAddNewNoteMutation } from '../Notes/notesApiSlice'
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave } from '@fortawesome/free-solid-svg-icons'
import { ROLES } from '../../config/roles'

const USER_REGEX = /^[A-z]{3,20}$/
const PASS_REGEX = /^[A-z0-9!@#$%]{6,12}$/

const NewUserForm = () => {
    const [addNewUser,{
        isLoading,
        isSuccess,
        isError,
        error
    }] = useAddNewNoteMutation()

    const navigate = useNavigate()

    const [username,setUsername] = useState('')
    const [validUsername,setValidUsername] = useState(false)
    const [password,setPassword] = useState('')
    const [validPassword,setValidPassword] = useState(false)
    const [roles,setRoles] = useState(["Employee"])

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
            setRoles([])
            navigate('/dash/users')
        }
    },[isSuccess,navigate])

  return (
    <div>NewUserForm</div>
  )
}

export default NewUserForm