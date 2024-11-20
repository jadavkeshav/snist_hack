import { Button } from '@nextui-org/react'
import Cookies from 'js-cookie'
import { IoLogOut } from 'react-icons/io5'

const LogoutButton = () => {

    const logout = () => {
        // Remove token and user from cookies
        Cookies.remove('token')
        Cookies.remove('user')
        // refresh page to remove any stale data
        window.location.reload()
    }

  return (
    <Button onClick={logout} className="w-full flex h-12 justify-between items-center space-x-1 cursor-pointer p-2 rounded-md text-gray-600 hover:bg-red-600 hover:text-white bg-gray-50">
        Logout
        <IoLogOut size={20} />
    </Button>
  )
}

export default LogoutButton