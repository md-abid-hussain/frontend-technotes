import DashHeader from "./DashHeader"
import DashFooter from "./DashFooter"
import { Outlet } from "react-router-dom"

const DashLayout = () => {
  return (
    <>
        <DashHeader/>
        <div className="container">
            <Outlet/>
        </div>
        <DashFooter/>
    </>
  )
}

export default DashLayout