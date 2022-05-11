import SideNavBar from '../components/SideNavBar'
import UserTable from '../components/userTable'
const UserPage = () => {
    return (
        <div>
            <SideNavBar/>
             <div className="container-work">
                <UserTable/>
            </div>
        </div>
    )
}

export default UserPage