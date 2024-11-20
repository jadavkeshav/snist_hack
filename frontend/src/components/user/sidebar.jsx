import { Link } from 'react-router-dom'
import Logo from '../../assets/logo.svg'
import { MdExplore, MdLeaderboard, MdSpaceDashboard } from 'react-icons/md'
import { IoSettings } from 'react-icons/io5'
import { FaStore, FaUserGroup } from "react-icons/fa6";
import LogoutButton from '../logout-button'
import { FaBook, FaChalkboardTeacher } from "react-icons/fa";
import { PiPathFill } from "react-icons/pi";
import { useEffect, useState } from 'react';
import useAuth from "../../hooks/use-auth";
import axios from 'axios';

const Sidebar = () => {
    const pathname = window.location.pathname;
    const { auth } = useAuth();
    const { user } = auth;

    const [coins, setCoins] = useState(0);

    useEffect(() => {
        const fetchCoins = async () => {
            const response = await axios.put(`${import.meta.env.VITE_API_URL}/user/get-coins`, {
                userId: user.id
            });
            setCoins(response.data.data);
        }
        fetchCoins();
    }, []);


    const sidebarItems = [
        {
            title: "Leaderboard",
            icon: <MdLeaderboard />,
            link: "/dashboard",
            link2: "/dashboard/"
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
            title: "Mentors",
            icon: <FaChalkboardTeacher />,
            link: "/dashboard/mentors",
            link2: "/dashboard/mentors/"
        },
        {
            title: "Learning Path",
            icon: <PiPathFill />,
            link: "/dashboard/learning-path",
            link2: "/dashboard/learning-path/"
        },
        {
            title: "Community",
            icon: <FaUserGroup />,
            link: "/dashboard/community",
            link2: "/dashboard/community/"
        },
        {
            title: "Store(CTX)",
            icon: <FaStore />,
            link: "/dashboard/store",
            link2: "/dashboard/store/"
        }
    ]

    return (
        <div className="h-full flex flex-col bg-white shadow-lg w-[18rem] justify-between px-4 py-6 fixed">
            <div className="w-full h-full space-y-4">
                <Link to="/" className="flex items-center space-x-2">
                    <div className="flex items-center space-x-2">
                    <img src={Logo} alt="Logo" className="w-14 h-14" />
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
                {/* display total coins */}
                <div className="flex justify-between items-center space-x-2 p-2 rounded-md bg-yellow-500 font-semibold text-lg">
                    <FaStore />
                    <span>{coins}</span>
                </div>
                <Link to="/dashboard/profile" className={`flex items-center justify-between px-4 space-x-2 py-2 rounded-md ${pathname === "/dashboard/settings" ? 'bg-gray-600 text-white' : 'text-gray-600 hover:bg-gray-200 hover:text-gray-500'}`}>
                    Profile
                    <IoSettings />
                </Link>
                <LogoutButton />
            </div>
        </div>
    )
}

export default Sidebar