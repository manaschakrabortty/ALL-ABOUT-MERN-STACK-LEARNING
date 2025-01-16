import { useContext, useEffect, useState } from "react"
import { Navigate, useNavigate } from "react-router-dom"
import { UserContext } from "../context/UserContext"
import toast from "react-hot-toast"
import axios from "axios"

const CreateCompetitionPage = () => {
    const [formData, setFormData] = useState({
        "title": "",
        "company": "",
        "country": "",
        "eligibility": "",
        "mode": "",
        "type": "",
        "prize": "",
        "deadline": "",
        "applyLink": ""
    })
    
    const [redirect, setRedirect] = useState("")

    const {userInfo} = useContext(UserContext)
    let email = userInfo?.email

    const navigate = useNavigate()

    useEffect(() => {
        if(email !== 'bishalkundu17@gmail.com')     navigate('/')
    }, [navigate, userInfo])

    const handleChange = (evt) => {
        const {name, value} = evt.target
        setFormData((oldData) => {
            return {...oldData, [name]: value}
        })
    }

    const createCompetition = async (evt) => {
        evt.preventDefault()
        try {
            console.log(formData)
            let {data} = await axios.post('/competition', formData)
            toast.success('Competition created successfully!')
            setRedirect('/competitions')
        }
        catch (err) {
            console.log(err)
            toast.error('Something went wrong!')
        }
    }

    if(redirect !== "")     return <Navigate to={redirect} />

    return (
        <div className="mx-auto my-5 w-full rounded-xl px-4 py-8 md:bg-[#dce6e8] md:w-4/12 md:shadow-primary md:mt-10">
            <h2 className="font-extrabold text-2xl text-center text-black">Welcome to JobHub! 👋</h2>

            <form className="mt-10">
                <div className="my-1">
                    <label className="px-1" htmlFor="title">Title</label>
                    <input
                        type="text"
                        placeholder="Google Girl Hackathon"
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                    />
                </div>

                <div className="my-1">
                    <label className="px-1" htmlFor="company">Company</label>
                    <input
                        type="text"
                        placeholder="Google"
                        id="company"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                    />
                </div>

                <div className="my-1">
                    <label className="px-1" htmlFor="country">Country</label>
                    <input
                        type="text"
                        placeholder="India"
                        id="country"
                        name="country"
                        value={formData.country}
                        onChange={handleChange}
                    />
                </div>

                <div className="mt-1 mb-3 flex flex-col gap-1">
                    <label className="px-1" htmlFor="deadline">Application Deadline</label>
                    <input
                        type="date"
                        id="deadline"
                        name="deadline"
                        className="py-1 px-3 rounded-md"
                        value={formData.deadline}
                        onChange={handleChange}
                    />
                </div>

                <div className="my-1">
                    <label className="px-1" htmlFor="prize">Prize</label>
                    <input
                        type="text"
                        placeholder="100K"
                        id="prize"
                        name="prize"
                        value={formData.prize}
                        onChange={handleChange}
                    />
                </div>

                <div className="my-1">
                    <label className="px-1" htmlFor="applyLink">Apply Link</label>
                    <input
                        type="text"
                        placeholder="https://google.com"
                        id="applyLink"
                        name="applyLink"
                        value={formData.applyLink}
                        onChange={handleChange}
                    />
                </div>

                <div className="my-2">
                    <h3 className="px-1">Job Mode</h3>
                    <div className="flex gap-3">
                        <div className="flex gap-2 pl-1 mt-1">
                            <input type="radio" name="mode" id="offline" value='offline' onChange={handleChange} />
                            <label htmlFor="offline">Offline</label>
                        </div>
                        <div className="flex gap-2 pl-1 mt-1">
                            <input type="radio" name="mode" id="online" value='online' onChange={handleChange} />
                            <label htmlFor="online">Online</label>
                        </div>
                    </div>
                </div>

                <div className="my-2">
                    <h3 className="px-1">Job Type</h3>
                    <div className="flex gap-3">
                        <div className="flex gap-2 pl-1 mt-1">
                            <input type="radio" name="type" id="hackathon" value='Hackathon' onChange={handleChange} />
                            <label htmlFor="hackathon">Hackathon</label>
                        </div>
                        <div className="flex gap-2 pl-1 mt-1">
                            <input type="radio" name="type" id="coding-challenge" value='Coding Challenge' onChange={handleChange} />
                            <label htmlFor="coding-challenge">Coding Challenge</label>
                        </div>
                    </div>
                </div>

                <div className="my-2">
                    <h3 className="px-1">Eligibility</h3>
                    <div className="flex gap-3">
                        <div className="flex gap-2 pl-1 mt-1">
                            <input type="radio" name="eligibility" id="collegeStudents" value='collegeStudents' onChange={handleChange} />
                            <label htmlFor="collegeStudents">Students</label>
                        </div>
                        <div className="flex gap-2 pl-1 mt-1">
                            <input type="radio" name="eligibility" id="professionals" value='professionals' onChange={handleChange} />
                            <label htmlFor="professionals">Professionals</label>
                        </div>
                        <div className="flex gap-2 pl-1 mt-1">
                            <input type="radio" name="eligibility" id="startups" value='startups' onChange={handleChange} />
                            <label htmlFor="startups">Startups</label>
                        </div>
                    </div>
                </div>

                <button className="w-full bg-[#1196c2] mt-4 py-2 rounded-lg text-white transition ease-in duration-300 md:hover:bg-[rgb(36,131,163)]" onClick={createCompetition}>Create Competition</button>
            </form>
        </div>
    )
}

export default CreateCompetitionPage 