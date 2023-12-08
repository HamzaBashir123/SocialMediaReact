import { Chat, Person, Search , Notifications} from "@mui/icons-material"
import "./topbar.css"
import { Link } from "react-router-dom"
import { useContext } from "react"
import {AuthContext} from "..//../context/AuthContext"

export default function Topbar(){
    const { user } = useContext(AuthContext);
    // console.log(user ,"=====> topbar USER")
    const PF =  process.env.REACT_APP_PUBLIC_FOLDER;
    return(
        <div className="topbarContainer">
            <div className="topbarLeft">
                <Link to="/" style={{textDecoration: 'none'}}>
                <span className="logo">Social Media</span>
                </Link>
            </div>
            <div className="topbarCenter">
                <div className="searchbar">
                    <Search className="searchIcon"/>
                    <input type="text" placeholder="Search for friend, post or video" className="searchInput" />
                </div>
            </div>
            <div className="topbarRight">
                <div className="topbarLinks">
                    <span className="topbarLink">Homepage</span>
                    <span className="topbarLink">Timeline</span>
                </div>
                <div className="topbarIcons">
                    <div className="topbarIconItem">
                        <Person/>
                        <span className="topbarIconBadge">1</span>
                    </div>
                    <div className="topbarIconItem">
                        <Chat/>
                        <span className="topbarIconBadge">2</span>
                    </div>
                    <div className="topbarIconItem">
                        <Notifications/>
                        <span className="topbarIconBadge">1</span>
                    </div>
                </div>
                <Link to={`/profile/${user?.username || 'jane'}`}>
                <img src={user?.profilePicture ? PF + user?.profilePicture : PF + "person/noAvatar.jpg" } alt="" className="topbarImg" />
                </Link>


            </div>
            
             
        </div>
    )
}