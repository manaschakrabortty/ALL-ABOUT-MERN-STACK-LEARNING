import axios from "axios"
import { Navigate, useParams } from "react-router-dom"
import { useState } from "react"
import toast from "react-hot-toast"

const ResetPassPage = () => {
    const [formData, setFormData] = useState({ password: "", confirmedPassword: "" })
    const [redirect, setRedirect] = useState("")
    const [buttonLoading, setButtonLoading] = useState(false)

    const {userID} = useParams()

    const handleChange = (evt) => {
        const { name, value } = evt.target
        setFormData((prevData) => {
            return { ...prevData, [name]: value }
        })
    }

    const matchPass = async (evt) => {
        evt.preventDefault()
        setButtonLoading(true)
        
        if(formData.password === formData.confirmedPassword) {
            try {
                let {data} = await axios.put('/auth/resetPassword', {
                    password: formData.password, 
                    userID
                })
                toast.success("Your password is updated successfully!")
                setRedirect("/login")
            }
            catch (err) {
                toast.error('Something went wrong')
                console.log(err)
            }
        }
        else    toast.error("Password does not match")

        setButtonLoading(false)
    }

    if(redirect !== "") return <Navigate to={'/login'} />

    return (
        <div className="mx-auto mt-5 w-full rounded-xl px-4 py-8 md:bg-[#dce6e8] md:w-4/12 md:shadow-primary md:mt-10">
            <h2 className="font-extrabold text-2xl text-center text-black">Welcome to ProElevate! 👋</h2>
            <p className="text-center mt-2">Please reset your password</p>

            <form className="mt-10">

                <div className="my-1">
                    <label className="px-1" htmlFor="password">Password</label>
                    <input
                        type="password"
                        placeholder="Enter new password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                    />
                </div>

                <div className="my-1">
                    <label className="px-1" htmlFor="confirmedPassword">Confirm Password</label>
                    <input
                        type="password"
                        placeholder="Confirm new password"
                        id="confirmedPassword"
                        name="confirmedPassword"
                        value={formData.confirmedPassword}
                        onChange={handleChange}
                    />
                </div>

                <button
                    className="w-full bg-[#1196c2] mt-4 py-2 rounded-lg text-white transition ease-in duration-300 md:hover:bg-[rgb(36,131,163)] disabled:cursor-not-allowed"
                    disabled={buttonLoading}
                    onClick={matchPass}>
                    {buttonLoading ? "Please wait..." : "Reset Password"}
                </button>

            </form >
        </div >
    )
}

export default ResetPassPage