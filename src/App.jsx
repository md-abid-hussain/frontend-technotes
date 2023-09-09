import Layout from './Components/Layout'
import Public from './Components/Public'
import Login from './Features/Auth/Login'
import DashLayout from './Components/DashLayout'
import Welcome from './Features/Auth/Welcome'
import NotesList from './Features/Notes/NotesList'
import UsersList from './Features/Users/UsersList'
import NewUserForm from './Features/Users/NewUserForm'
import EditUser from './Features/Users/EditUser'
import NewNote from './Features/Notes/NewNote'
import EditNote from './Features/Notes/EditNote'
import Prefetch from './Features/Auth/Prefetch'
import PersistLogin from './Features/Auth/PersistLogin'
import RequireAuth from './Features/Auth/RequireAuth'
import { ROLE } from './config/role'
import {Route,Routes} from 'react-router-dom'

function App() {

  return (
    <Routes>
      <Route path="/" element={<Layout/>}>

        <Route index element={<Public/>}/>

        <Route path="login" element={<Login/>}/>
        <Route element={<PersistLogin/>}>
          <Route element={<RequireAuth allowedRoles={[...Object.values(ROLE)]} />}>
            <Route element={<Prefetch/>}>
              <Route path="dash" element={<DashLayout/>}>

                <Route index element={<Welcome/>}/>
                
                <Route element={<RequireAuth allowedRoles={[ROLE.Admin, ROLE.Manager]} />}>
                  <Route path='users'>
                    <Route index element={<UsersList/>}/>
                    <Route path=':id' element={<EditUser/>}/>
                    <Route path='new' element={<NewUserForm/>}/>
                  </Route>
                </Route>

                <Route path='notes'>
                  <Route index element={<NotesList/>}/>
                  <Route path=':id' element={<EditNote/>}/>
                  <Route path='new' element={<NewNote/>}/>
                </Route>
                
              </Route>
            </Route>
          </Route>
        </Route>
      </Route>
    </Routes>
  )
}

export default App
