import axios from "axios"
import { Link, Navigate } from "react-router-dom"
import { useContext, useState } from "react"
import toast from "react-hot-toast"


const RegisterPage = () => {
    const [formData, setFormData] = useState({ fullName: "", email: "", password: "" })
    const [redirect, setRedirect] = useState("")
    const [buttonLoading, setButtonLoading] = useState(false)

    const [curPage, setCurPage] = useState("register") // toggling to otp page
    const [time, setTime] = useState(300)
    const [otp, setOtp] = useState("")
    const [resendOTP, setResendOTP] = useState(false) // verify/resent otp button

    let timerInterval
    let minutes = Math.floor(time / 60).toString().padStart(2, '0')
    let seconds = Math.floor(time % 60).toString().padStart(2, '0')

    const startTimer = () => {
        setTime(300)
        timerInterval = setInterval(decrementTimer, 1000)
    }

    const decrementTimer = () => {
        setTime(prevTime => {
            if (prevTime > 0) {
                return prevTime - 1;
            }
            else {
                clearInterval(timerInterval);
                setResendOTP(true);
            }
        })
    }

    const handleChange = (evt) => {
        const { name, value } = evt.target
        setFormData((prevData) => {
            return { ...prevData, [name]: value }
        })
    }

    const verifyOTP = async (evt) => {
        setButtonLoading(true)
        evt?.preventDefault()

        try {
            await axios.post('/auth/verifyOTP', {email: formData.email, otp})
            register()
        }
        catch (err) {
            console.log(err)
            const {data, status} = err.response
            toast.error(data.message)
            
            if(status === 401) {
                setOtp("")
                setResendOTP(false)
            }
            else if(status === 500) {
                clearInterval(timerInterval)
                setTime(0)
                setResendOTP(true)
            }
        }

        setButtonLoading(false)
    }

    const sendOTP = async (evt) => {
        evt?.preventDefault()
        setButtonLoading(true)
        setOtp("")
        clearInterval(timerInterval)

        try {
            let {data} = await axios.post('/auth/sendOTP', {email: formData.email})
            toast.success('An OTP has been sent to your email!')
            setCurPage("otp")
            setResendOTP(false)
            startTimer()
        }
        catch (err) {
            const {data} = err.response
            toast.error(data.message)
            clearInterval(timerInterval)
            setTime(0)
            setResendOTP(true)
        }

        setButtonLoading(false)
    }

    const register = async (evt) => {
        evt?.preventDefault()
        setButtonLoading(true)
        try {
            let { data } = await axios.post('/auth/register', formData)
            toast.success('Successfully registered!')
            setRedirect('/login')
        }
        catch (err) {
            const { data, status } = err.response
            toast.error(data.message)
        }
        setButtonLoading(false)
    }

    if (redirect !== "") return <Navigate to={redirect} />

    return (
        <div className="mx-auto mt-5 w-full rounded-xl px-4 py-8 md:w-4/12 md:bg-[#dce6e8] md:shadow-primary md:my-10">
            <h2 className="font-extrabold text-2xl text-center text-black">Welcome to JobHub! 👋</h2>
            <p className="text-center mt-2">Please create your account</p>

            <form className="mt-10">
                {curPage === 'register' &&
                    <>
                        <div className="my-1">
                            <label className="px-1" htmlFor="fullName">Name</label>
                            <input
                                type="email"
                                placeholder="John Doe"
                                id="fullName"
                                name="fullName"
                                value={formData.fullName}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="my-1">
                            <label className="px-1" htmlFor="email">Email</label>
                            <input
                                type="email"
                                placeholder="john.doe@gmail.com"
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
                                placeholder="Your password"
                                id="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                            />
                        </div>

                        <button
                            className="w-full bg-[#1196c2] mt-4 py-2 rounded-lg text-white transition ease-in duration-300 md:hover:bg-[rgb(36,131,163)] disabled:cursor-not-allowed"
                            onClick={sendOTP}
                            disabled={buttonLoading}>
                            {buttonLoading ? "Please wait..." : "Register"}
                        </button>

                        <p className="text-center mt-3">Already have an account? <Link className="text-blue-800" to='/login'>Login</Link></p>
                    </>
                }

                {curPage === 'otp' &&
                    <>
                        <div className="my-1">
                            <label className="px-1" htmlFor="otp">OTP</label>
                            <input
                                type="email"
                                placeholder="Enter OTP"
                                id="otp"
                                name="otp"
                                value={otp}
                                onChange={(evt) => setOtp(evt.target.value)}
                                required
                                autoFocus
                            />
                            {time > 0 && <p className="text-center">Resend OTP in {minutes}:{seconds}</p>}
                        </div>

                        {resendOTP && 
                            <button
                                className="w-full bg-[#1196c2] mt-4 py-2 rounded-lg text-white transition ease-in duration-300 md:hover:bg-[rgb(36,131,163)] disabled:cursor-not-allowed"
                                onClick={sendOTP}
                                disabled={buttonLoading}>
                                {buttonLoading ? "Please wait..." : "Resend OTP"}
                            </button>
                        }

                        {!resendOTP && 
                            <button
                                className="w-full bg-[#1196c2] mt-4 py-2 rounded-lg text-white transition ease-in duration-300 md:hover:bg-[rgb(36,131,163)] disabled:cursor-not-allowed"
                                onClick={verifyOTP}
                                disabled={buttonLoading}>
                                {buttonLoading ? "Please wait..." : "Verify"}
                            </button>
                        }
                    </>
                }
            </form>
        </div>
    )
}

export default RegisterPage