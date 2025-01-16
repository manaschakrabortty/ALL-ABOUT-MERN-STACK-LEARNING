import axios from "axios"
import { Link, Navigate, useLocation } from "react-router-dom"
import { useContext, useState } from "react"
import { UserContext } from "../context/UserContext"
import toast from "react-hot-toast"

const LoginPage = () => {
    const [formData, setFormData] = useState({email: "", password: ""})
    const [redirect, setRedirect] = useState("")
    const [buttonLoading, setButtonLoading] = useState(false)
    const {userInfo, setUserInfo} = useContext(UserContext)
    const [curPage, setCurPage] = useState("login")

    const location = useLocation()
    let fromPage = location.state?.from || "/"

    const handleChange = (evt) => {
        const {name, value} = evt.target
        setFormData((prevData) => {
            return {...prevData, [name]: value}
        })
    }

    const login = async (evt) => {
        evt.preventDefault()
        setButtonLoading(true)
        try {
            let {data} = await axios.post('/auth/login', formData)
            console.log(data)
            toast.success(`Welcome, ${data.fullName}`)
            setUserInfo(data)
            setRedirect(fromPage)
        }
        catch (err) {
            setUserInfo(null)
            const {data, status} = err.response
            toast.error(data.message)
        }
        setButtonLoading(false)
    }

    const sendResetPassMail = async (evt) => {
        evt?.preventDefault()
        setButtonLoading(true)

        try {
            let {data} = await axios.post('/auth/sendResetPassMail', formData)
            toast.success('Check your email!')
        }
        catch (err) {
            toast.err("Something went wrong!")
        }

        setButtonLoading(false)
    }

    if(redirect !== "")    return <Navigate to={redirect} />

    return (
        <div className="mx-auto mt-5 w-full rounded-xl px-4 py-8 md:bg-[#dce6e8] md:w-4/12 md:shadow-primary md:mt-10">
            <h2 className="font-extrabold text-2xl text-center text-black">Welcome to JobHub! 👋</h2>
            <p className="text-center mt-2">{curPage === 'login'? "Please sign in to your account" : "Please enter your email id"}</p>
            
            <form className="mt-10">
                {curPage === 'login' &&
                    <>
                        <div className="my-1">
                            <label className="px-1" htmlFor="email">Email</label>
                            <input
                                type="email"
                                placeholder="Enter email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="my-1">
                            <label className="px-1" htmlFor="password">Password</label>
                            <input
                                type="password"
                                placeholder="Enter password"
                                id="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                            />
                        </div>

                        <span 
                            className="text-sm pl-1 cursor-pointer" 
                            onClick={() => setCurPage("reset-pass")}>
                                Forgot Password?
                        </span>

                        <button
                            className="w-full bg-[#1196c2] mt-4 py-2 rounded-lg text-white transition ease-in duration-300 md:hover:bg-[rgb(36,131,163)] disabled:cursor-not-allowed"
                            onClick={login}
                            disabled={buttonLoading}>
                            {buttonLoading ? "Please wait..." : "Login"}
                        </button>

                        <p className="text-center mt-3">Don't have an account? <Link className="text-blue-800" to='/register'>Register Now</Link></p>
                    </>
                }

                {curPage === 'reset-pass' && 
                    <>
                        <div className="my-1">
                            <label className="px-1" htmlFor="email">Email</label>
                            <input
                                type="email"
                                placeholder="Enter email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                            />

                            <button
                                className="w-full bg-[#1196c2] mt-4 py-2 rounded-lg text-white transition ease-in duration-300 md:hover:bg-[rgb(36,131,163)] disabled:cursor-not-allowed"
                                onClick={sendResetPassMail}
                                disabled={buttonLoading}>
                                {buttonLoading ? "Please wait..." : "Reset Password"}
                            </button>                            

                        </div>


                    </>
                }
            </form>
        </div>
    )
}

export default LoginPage