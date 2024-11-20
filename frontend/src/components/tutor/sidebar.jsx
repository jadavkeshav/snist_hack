import { Link } from 'react-router-dom'
import Logo from '../../assets/logo.svg'
import { MdExplore, MdSpaceDashboard, MdLeaderboard } from 'react-icons/md'
import { IoSettings } from 'react-icons/io5'
import { FaUserGroup } from "react-icons/fa6";
import LogoutButton from '../logout-button'
import { FaBook, FaChalkboardTeacher, FaPenSquare } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";

const TutorSidebar = () => {

    const pathname = window.location.pathname;

    const sidebarItems = [
        {
            title: "Leaderboard",
            icon: <MdLeaderboard />,
            link: "/dashboard",
            link2: "/dashboard/"
        },
        {
            title: "Community",
            icon: <FaUserGroup />,
            link: "/dashboard/community",
            link2: "/dashboard/community/"
        },
        {
            title: "Assignments",
            icon: <MdExplore />,
            link: "/dashboard/assignments",
            link2: "/dashboard/assignments/"
        },
        {
            title: "Courses",
            icon: <FaBook />,
            link: "/dashboard/courses",
            link2: "/dashboard/courses/"
        },
        {
            title: "Create Course",
            icon: <FaChalkboardTeacher />,
            link: "/dashboard/create-course",
            link2: "/dashboard/create-course/"
        },
        {
            title: "Create Assignment",
            icon: <FaPenSquare />,
            link: "/dashboard/create-task",
            link2: "/dashboard/create-task/"
        }
    ]

    return (
        <div className="h-full flex flex-col bg-white shadow-lg w-[18rem] justify-between px-4 py-6 sticky top-0 left-0">
            <div className="w-full h-full space-y-4">
                <Link to="/" className="flex items-center space-x-2">
                    <div className="flex items-center space-x-2">
                        <img src={Logo} alt="Logo" className="w-12 h-12" />
                        <h1 className="text-3xl font-bold text-center text-blue-500">
                          BrainQuest
                        </h1>
                    </div>
                </Link>
                <div className="w-full h-full space-y-2">
                    {
                        sidebarItems.map((item, index) => (
                            <Link key={index} to={item.link} className={`flex items-center space-x-2 p-2 rounded-md ${pathname === item.link || pathname === item.link2 ? 'bg-blue-500 text-white' : 'text-gray-600 hover:bg-blue-200 hover:text-gray-500'}`}>
                                {item.icon}
                                <span>{item.title}</span>
                            </Link>
                        ))
                    }
                </div>
            </div>
            <div className="w-full flex flex-col space-y-2">
                <Link to="/dashboard/profile" className={`flex items-center justify-between px-2 space-x-2 py-2 rounded-md ${pathname === "/dashboard/profile" ? 'bg-gray-600 text-white' : 'text-gray-600 hover:bg-gray-200 hover:text-gray-500'}`}>
                    Profile
                    <CgProfile size={24} />
                </Link>
                <LogoutButton />
            </div>
        </div>
    )
}

export default TutorSidebar