import { useState, useEffect, useContext } from "react"
import { Navigate, useNavigate } from "react-router-dom"
import { UserContext } from "../context/UserContext"
import toast from "react-hot-toast"
import axios from "axios"

const CreateJobPage = () => {
    const [formData, setFormData] = useState({
        "title": undefined,
        "company": undefined,
        "country": undefined,
        "location": undefined,
        "skills": undefined,
        "eligibleBatches": undefined,
        "duration": undefined,
        "requiredExperience": undefined,
        "startDate": undefined,
        "deadline": undefined,
        "stipend": undefined,
        "salary": undefined,
        "role": undefined,
        "mode": undefined,
        "type": undefined,
        "applyLink": undefined
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

    // send job data to backend
    const createJob = async (evt) => {
        evt.preventDefault()
        try {
            let {data} = await axios.post('/job', formData)
            toast.success('Created the job successfully!')
            setRedirect("/jobs")
        }
        catch (err) {
            console.log(err)
            toast.error('Something went wrong! Try again after sometime!')
        }
    }

    if(redirect !== "")     return <Navigate to={redirect} />

    return (
        <div className="mx-auto mt-5 w-full rounded-xl px-4 py-8 md:bg-[#dce6e8] md:w-4/12 md:shadow-primary md:mt-10">
            <h2 className="font-extrabold text-2xl text-center text-black">Welcome to JobHub! 👋</h2>

            <form className="mt-10">
                <div className="my-1">
                    <label className="px-1" htmlFor="title">Title</label>
                    <input
                        type="text"
                        placeholder="Enter title"
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
                        placeholder="Enter company"
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
                        placeholder="Enter country"
                        id="country"
                        name="country"
                        value={formData.country}
                        onChange={handleChange}
                    />
                </div>

                <div className="my-1">
                    <label className="px-1" htmlFor="location">Location</label>
                    <input
                        type="text"
                        placeholder="Enter location"
                        id="location"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                    />
                </div>

                <div className="my-1">
                    <label className="px-1" htmlFor="skills">Skills</label>
                    <input
                        type="text"
                        placeholder="Enter skills"
                        id="skills"
                        name="skills"
                        value={formData.skills}
                        onChange={handleChange}
                    />
                </div>

                <div className="my-1">
                    <label className="px-1" htmlFor="eligibleBatches">Eligible Batches</label>
                    <input
                        type="text"
                        placeholder="Enter eligibleBatches"
                        id="eligibleBatches"
                        name="eligibleBatches"
                        value={formData.eligibleBatches}
                        onChange={handleChange}
                    />
                </div>

                <div className="my-1">
                    <label className="px-1" htmlFor="duration">Duration (Months)</label>
                    <input
                        type="Number"
                        placeholder="Enter duration"
                        id="duration"
                        name="duration"
                        value={formData.duration}
                        onChange={handleChange}
                    />
                </div>

                <div className="my-1">
                    <label className="px-1" htmlFor="requiredExperience">YOE</label>
                    <input
                        type="text"
                        placeholder="Enter required experience"
                        id="requiredExperience"
                        name="requiredExperience"
                        value={formData.requiredExperience}
                        onChange={handleChange}
                    />
                </div>

                <div className="mt-1 mb-3 flex flex-col gap-1">
                    <label className="px-1" htmlFor="startDate">Start Date</label>
                    <input
                        type="date"
                        id="startDate"
                        name="startDate"
                        className="py-1 px-3 rounded-md"
                        value={formData.startDate}
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
                    <label className="px-1" htmlFor="stipend">Stipend</label>
                    <input
                        type="number"
                        placeholder="Enter stipend"
                        id="stipend"
                        name="stipend"
                        value={formData.stipend}
                        onChange={handleChange}
                    />
                </div>

                <div className="my-1">
                    <label className="px-1" htmlFor="salary">Salary</label>
                    <input
                        type="number"
                        placeholder="Enter salary"
                        id="salary"
                        name="salary"
                        value={formData.salary}
                        onChange={handleChange}
                    />
                </div>

                <div className="my-1">
                    <label className="px-1" htmlFor="role">Role</label>
                    <input
                        type="text"
                        placeholder="Enter role"
                        id="role"
                        name="role"
                        value={formData.role}
                        onChange={handleChange}
                    />
                </div>

                <div className="my-1">
                    <label className="px-1" htmlFor="applyLink">Apply Link</label>
                    <input
                        type="text"
                        placeholder="Enter Apply Link"
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
                            <input type="radio" name="mode" id="onsite" value='onsite' onChange={handleChange} />
                            <label htmlFor="onsite">Onsite</label>
                        </div>
                        <div className="flex gap-2 pl-1 mt-1">
                            <input type="radio" name="mode" id="remote" value='remote' onChange={handleChange} />
                            <label htmlFor="remote">Remote</label>
                        </div>
                        <div className="flex gap-2 pl-1 mt-1">
                            <input type="radio" name="mode" id="hybrid" value='hybrid' onChange={handleChange} />
                            <label htmlFor="hybrid">Hybrid</label>
                        </div>
                    </div>
                </div>

                <div className="my-2">
                    <h3 className="px-1">Job Type</h3>
                    <div className="flex gap-3">
                        <div className="flex gap-2 pl-1 mt-1">
                            <input type="radio" name="type" id="full-time" value='full-time' onChange={handleChange} />
                            <label htmlFor="full-time">Full Time</label>
                        </div>
                        <div className="flex gap-2 pl-1 mt-1">
                            <input type="radio" name="type" id="internship" value='internship' onChange={handleChange} />
                            <label htmlFor="internship">Internship</label>
                        </div>
                        <div className="flex gap-2 pl-1 mt-1">
                            <input type="radio" name="type" id="apprenticeship" value='apprenticeship' onChange={handleChange} />
                            <label htmlFor="apprenticeship">Apprenticeship</label>
                        </div>
                    </div>
                </div>

                <button className="w-full bg-[#1196c2] mt-4 py-2 rounded-lg text-white transition ease-in duration-300 md:hover:bg-[rgb(36,131,163)]" onClick={createJob}>Create Job</button>
            </form>
        </div>
    )
}

export default CreateJobPage