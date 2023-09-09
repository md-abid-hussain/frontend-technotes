import { useSelector } from "react-redux";
import {selectCurrentToken} from '../Features/Auth/authSlice'
import jwtDecode from "jwt-decode";

const useAuth = () => {
  const token = useSelector(selectCurrentToken)
  let isAdmin = false
  let isManager = false
  let status = "Employee"

  if(token){
    const decode = jwtDecode(token)
    const {username,role} = decode.UserInfo
    isManager = role.includes('Manager')
    isAdmin = role.includes('Admin')

    if(isManager) status = 'Manager'
    if(isAdmin) status = 'Admin'

    return {username,role,status,isManager,isAdmin}
  }

  return {
    username:'',
    role:[],
    isManager,
    isAdmin,
    status
  }
}

export default useAuth