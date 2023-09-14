import { useNavigate,Link,useLocation } from "react-router-dom"
import { useEffect } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
    faRightFromBracket,
    faFileCirclePlus,
    faFilePen,
    faUserGear,
    faUserPlus
} from "@fortawesome/free-solid-svg-icons"
import { useSendLogoutMutation } from "../Features/Auth/authApiSlice"
import useAuth from '../hooks/useAuth'
import  PulseLoader  from "react-spinners/PulseLoader"

const DASH_REGEX = /^\/dash(\/)?$/
const NOTES_REGEX = /^\/dash\/notes(\/)?$/
const USERS_REGEX = /^\/dash\/users(\/)?$/

const DashHeader = () => {

    const {isAdmin,isManager} = useAuth()

    const navigate = useNavigate()
    const {pathname}=useLocation()

    const [sendLogout,{
        isLoading,
        isSuccess,
        isError,
        error
    }] = useSendLogoutMutation()

    const errClass = isError ? "errmsg":"offscreen"
    const errContent = isError ? error.data?.message: null

    useEffect(()=>{
        if (isSuccess){
            navigate('/')
        }
    },[isSuccess, navigate])

    const onNewNoteClicked = ()=>navigate('/dash/notes/new')
    const onNewUserClicked = ()=>navigate('/dash/users/new')
    const onNotesClicked = ()=> navigate('/dash/notes')
    const onUsersClicked = ()=>navigate('/dash/users')

    const onLogoutClick = ()=>sendLogout()

    let dashClass = null

    if(!DASH_REGEX.test(pathname) && !NOTES_REGEX.test(pathname) && !USERS_REGEX.test(pathname)){
        dashClass = 'dash-header_container-small'
    }

    let newNoteButton = null
    if (NOTES_REGEX.test(pathname)) {
        newNoteButton = (
            <button
                className="icon-button"
                title="New Note"
                onClick={onNewNoteClicked}
            >
                <FontAwesomeIcon icon={faFileCirclePlus} />
            </button>
        )
    }

    let newUserButton = null
    if (USERS_REGEX.test(pathname)) {
        newUserButton = (
            <button
                className="icon-button"
                title="New User"
                onClick={onNewUserClicked}
            >
                <FontAwesomeIcon icon={faUserPlus} />
            </button>
        )
    }

    let userButton = null
    if (isManager || isAdmin) {
        if (!USERS_REGEX.test(pathname) && pathname.includes('/dash')) {
            userButton = (
                <button
                    className="icon-button"
                    title="Users"
                    onClick={onUsersClicked}
                >
                    <FontAwesomeIcon icon={faUserGear} />
                </button>
            )
        }
    }

    let notesButton = null
    if (!NOTES_REGEX.test(pathname) && pathname.includes('/dash')) {
        notesButton = (
            <button
                className="icon-button"
                title="Notes"
                onClick={onNotesClicked}
            >
                <FontAwesomeIcon icon={faFilePen} />
            </button>
        )
    }


    const logoutButton = (
        <button
            className="icon-button"
            title="logout"
            onClick={onLogoutClick}
        >
            <FontAwesomeIcon icon={faRightFromBracket}/>
        </button>
    )

    let buttonContent
    if(isLoading){
        buttonContent = <PulseLoader color="#fff"/>
    }else{
        buttonContent = (
            <>
                {newNoteButton}
                {newUserButton}
                {userButton}
                {notesButton}
                {logoutButton}
            </>
        )
    }

    const content = (
        <>
            <p className={errClass}>{errContent}</p>
            <header className="dash-header">
                <div className={`dash-header_container ${dashClass}`}>                
                    <h1 className="dash-header_title"><Link to="/dash">TechNotes </Link></h1>
                    <nav className="dash-header_nav">
                        {buttonContent}
                    </nav>
                </div>
            </header>
        </>
      )

  return content
}

export default DashHeader