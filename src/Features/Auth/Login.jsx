import {useRef,useState,useEffect} from 'react'
import { useNavigate,Link } from 'react-router-dom'

import { useDispatch } from 'react-redux'
import { setCredentials } from './authSlice'
import { useLoginMutation } from './authApiSlice'

import usePersist from '../../hooks/usePersist'

import  PulseLoader  from "react-spinners/PulseLoader"

const Login = () => {
    const userRef = useRef()
    const errRef = useRef()

    const [username,setUsername] = useState('')
    const [password,setPassword] = useState('')
    const [errMsg,setErrMsg] = useState('')

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [persist,setPersist] = usePersist()

    useEffect(()=>{
      userRef.current.focus()
    },[])

    useEffect(()=>{
      setErrMsg('')
    },[username,password])

    const [login,{isLoading}] = useLoginMutation()

    const errClass = errMsg? "errmsg":"offscreen"

    if (isLoading){
      return <PulseLoader color='#FFF'/>
    }

    const handleSubmit = async (e)=>{
      e.preventDefault()
      try{
        const {accessToken} = await login({username, password}).unwrap()
        dispatch(setCredentials({accessToken}))
        setUsername('')
        setPassword('')
        navigate('/dash')
      }catch(err){
        // if(!err.status){
        //   setErrMsg('No server response')
        // }else if(err.status === 400){
        //   setErrMsg('Missing username or password')
        // }else if(err.status === 401){
        //   setErrMsg('Invalid Credentials')
        // }else{
        //   setErrMsg(err?.data?.message || err?.message)
        // }
        if(!err?.data?.message){
          console.log(err)
          setErrMsg('No response from server')
        }else{
          setErrMsg(err.data.message)
        }
        
      }
    }

    const handleUserInput = (e)=>setUsername(e.target.value)

    const handlePasswordInput = (e)=>setPassword(e.target.value)
    

    const handlePersistToggle = ()=>setPersist(prev => !prev)

    const content = (
      <section className='public'>
        <header>
          <h1>Employee Login</h1>
        </header>

        <main className='grid center form_container'>
          <p ref={errRef} className={errClass} aria-live='assertive'>{errMsg}</p>
          <form className='form' onSubmit={handleSubmit}>
            <label className='form_label' htmlFor="username">Username:</label>
            <input
              className='form_input'
              type='text'
              id='username'
              ref={userRef}
              value={username}
              onChange={handleUserInput}
              autoComplete='off'
              required
            />
            <label className='form_label' htmlFor="password">Password:</label>
            <input
              type="password"
              className='form_input'
              id='password'
              value={password}
              onChange ={handlePasswordInput}
              required
            />
            <button className='form_submit-button'>Sign In</button>
            <label htmlFor="persist" className='form_label'>
              <input
                type="checkbox"
                id="persist"
                checked={persist}
                onChange={handlePersistToggle}
                className='form_checkbox'
              /> Remember Me
            </label>
          </form>
        </main>

        <footer>
          <Link to='/'>Back to Home</Link>
        </footer>

      </section>
    )

    return content
}

export default Login