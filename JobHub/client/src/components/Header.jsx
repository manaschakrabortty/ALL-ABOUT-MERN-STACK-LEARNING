import { Link, useLocation } from "react-router-dom"
import { UserContext } from "../context/UserContext"
import { useContext, useEffect } from "react"
import toast from "react-hot-toast"
import axios from "axios"

const Header = () => {
    const { userInfo, setUserInfo } = useContext(UserContext)
    let email = userInfo?.email
    const location = useLocation()
    let pathname = location.pathname

    useEffect(() => {
        getUserInfo()
    }, [])

    const getUserInfo = async () => {
        try {
            let { data } = await axios.get('/auth/profile')
            setUserInfo(data)
        }
        catch (err) {
            setUserInfo(null)
            console.log(err)
        }
    }

    const logout = () => {
        try {
            let { data } = axios.post("/auth/logout")
            toast.success('Logged out successfully!')
            setUserInfo(null)
        }
        catch (err) {
            toast.error('Something went wrong!')
            console.log(err)
        }
    }

    let fullName = userInfo?.fullName

    return (
        <nav className="px-20 py-4 flex gap-40 justify-around z-10">

            <div className="text-2xl font-extrabold tracking-widest flex items-center">JobHub</div>

            <div className="flex items-center">
                <ul className="list-none flex gap-10 text-lg">
                    <Link
                        className="font-medium cursor-pointer transition ease-in duration-400 md:hover:text-[red]"
                        to={'/'}>
                        Home
                    </Link>

                    <Link
                        className="font-medium cursor-pointer transition ease-in duration-400 md:hover:text-[red]"
                        to={'/jobs'}>
                        Jobs
                    </Link>

                    <Link
                        className="font-medium cursor-pointer transition ease-in duration-400 md:hover:text-[red]"
                        to={'/competitions'}>
                        Competitions
                    </Link>
                </ul>
            </div>

            <div className="flex items-center">
                {!fullName && <ul className="list-none flex gap-3">
                    <Link
                        className="px-4 py-2 rounded-md bg-[#1196c2] transition ease-in duration-400 md:hover:bg-[rgb(36,131,163)] text-white"
                        to={'/login'}>
                        Login
                    </Link>

                    <Link
                        className="px-4 py-2 rounded-md bg-[#1196c2] transition ease-in duration-400 md:hover:bg-[rgb(36,131,163)] text-white"
                        to={'/register'}>
                        Register
                    </Link>
                </ul>}

                {fullName && <ul className="list-none flex gap-3">
                    {email === 'bishalkundu17@gmail.com' && (pathname === '/jobs' || pathname === '/competitions') &&
                        <Link
                            className="px-4 py-2 rounded-md bg-[#1196c2] transition ease-in duration-400 text-white md:hover:bg-[rgb(36,131,163)]"
                            to={`${pathname}/create`}>
                            Create
                        </Link>
                    }

                    {email !== 'bishalkundu17@gmail.com' &&
                        <span
                            className="px-4 py-2 rounded-md bg-[#1196c2] transition ease-in duration-400 text-white">
                            {fullName.split(" ")[0]}
                        </span>
                    }

                    <span
                        className="cursor-pointer px-4 py-2 rounded-md bg-[#1196c2] transition ease-in duration-400 md:hover:bg-[rgb(36,131,163)] text-white"
                        onClick={logout}>
                        Logout
                    </span>
                </ul>}
            </div>

        </nav>
    )
}

export default Header