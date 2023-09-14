import { Link } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowCircleRight } from "@fortawesome/free-solid-svg-icons"
import useAuth from "../../hooks/useAuth"
import useTitle from '../../hooks/useTitle'

const Welcome = () => {

    useTitle('Dashboard')

    const {username, isAdmin, isManager } = useAuth()

    const date = new Date()
    const today = new Intl.DateTimeFormat('en-US',{dateStyle:'full',timeStyle:'long'}).format(date)

    const content = (
        <main className="welcome">
            <p>{today}</p>
            <h1>Welcome! {username}</h1>
            <ul>
                <li><Link to="/dash/notes"><FontAwesomeIcon icon={faArrowCircleRight}/> View TechNotes</Link></li>
                <li><Link to="/dash/notes/new"><FontAwesomeIcon icon={faArrowCircleRight}/> Add new TechNotes</Link></li>
                {(isAdmin || isManager) && 
                    <>
                        <li><Link to="/dash/users"><FontAwesomeIcon icon={faArrowCircleRight}/> View User Settings</Link></li>
                        <li><Link to="/dash/users/new"><FontAwesomeIcon icon={faArrowCircleRight}/> Add new User</Link></li>
                    </>
                }
            </ul>
        </main>
    )
  return content
}

export default Welcome