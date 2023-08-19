import Layout from './Components/Layout'
import Public from './Components/Public'
import Login from './Features/Auth/Login'
import DashLayout from './Components/DashLayout'
import Welcome from './Features/Auth/Welcome'
import NotesList from './Features/Notes/NotesList'
import UsersList from './Features/Users/UsersList'
import NewUserForm from './Features/Users/NewUserForm'
import EditUser from './Features/Users/EditUser'
import NewNoteForm from './Features/Notes/NewNoteForm'
import EditNote from './Features/Notes/EditNote'
import {Route,Routes} from 'react-router-dom'

function App() {

  return (
    <Routes>
      <Route path="/" element={<Layout/>}>

        <Route index element={<Public/>}/>

        <Route path="login" element={<Login/>}/>

        <Route path="dash" element={<DashLayout/>}>

          <Route index element={<Welcome/>}/>
          
          <Route path='users'>
            <Route index element={<UsersList/>}/>
            <Route path=':id' element={<EditUser/>}/>
            <Route path='new' element={<NewUserForm/>}/>
          </Route>

          <Route path='notes'>
            <Route index element={<NotesList/>}/>
            <Route path=':id' element={<EditNote/>}/>
            <Route path='new' element={<NewNoteForm/>}/>
          </Route>
          
        </Route>
      </Route>
    </Routes>
  )
}

export default App
