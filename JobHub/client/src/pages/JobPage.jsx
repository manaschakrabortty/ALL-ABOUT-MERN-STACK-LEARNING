import { useContext, useEffect, useState } from "react"
import { UserContext } from "../context/UserContext"
import { useNavigate } from "react-router-dom"
import Spinner from "../components/Spinner"
import axios from "axios"
import JobCard from "../components/JobCard"

const JobPage = () => {
    
    // states for filters
    const [jobType, setJobType] = useState({
        "full-time": false, 
        "internship": false, 
        "apprenticeship": false 
    })
    const [jobRoles, setJobRoles] = useState({ 
        "programming": false, 
        "support": false, 
        "management": false, 
        "design": false, 
        "sales": false 
    })
    const [jobMode, setJobMode] = useState({
        "onsite": false, 
        "hybrid": false, 
        "remote": false
    })
    
    // all jobs fetched from the backend will be stored here
    const [jobs, setJobs] = useState([]) 
    
    // user data
    const {userInfo} = useContext(UserContext)
    const navigate = useNavigate()

    // page loader
    const [pageLoading, setPageLoading] = useState(true)

    // fetching jobs from server
    useEffect(() => {
        if(!userInfo)   navigate("/login", { state: { from: "/jobs" }})
        else getAllJobs()
    }, [navigate, userInfo])

    // getting all jobs from backend
    const getAllJobs = async () => {
        try {
            const {data} = await axios.get('/job')
            setJobs(data)
        }
        catch (err) { console.log(err) }
        setPageLoading(false)
    }

    // managing states for the filter checkboxes
    const handleChange = (evt, obj, setObj) => {
        const {name} = evt.target
        const oldValue = obj[name]
        setObj((oldType) => {
            return {...oldType, [name]: !oldValue}
        })
    }

    // gets filtered jobs from backend
    const applyFilters = async () => {
        setPageLoading(true)

        let jobTypeQueries = Object.keys(jobType).filter(key => jobType[key])
        let jobRoleQueries = Object.keys(jobRoles).filter(key => jobRoles[key])
        let jobModeQueries = Object.keys(jobMode).filter(key => jobMode[key])

        let queryObject = {}
        if (jobTypeQueries.length)     queryObject.jobType = jobTypeQueries
        if (jobRoleQueries.length)     queryObject.jobRole = jobRoleQueries
        if (jobModeQueries.length)     queryObject.jobMode = jobModeQueries

        const params = new URLSearchParams(queryObject)

        try {
            const {data} = await axios.get(`/job?${params.toString()}`)
            console.log(data)
            setJobs(data)
        }
        catch (err) { console.log(err) }

        setPageLoading(false)
    }

    if (pageLoading)   return <Spinner loading={pageLoading} />

    return (
        <div className="flex gap-20 px-20 mt-5">
            <div className="">
                <details className="bg-[#f0ecec] shadow-xl rounded-lg px-4 py-2 mb-4" open>
                    <summary className="text-lg w-60 list-none cursor-pointer">Job Type</summary>
                    <form className="mt-2">
                        <div className="flex items-center">
                            <input 
                                type="checkbox" 
                                id="full-time"
                                name="full-time"
                                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                                checked={jobType["full-time"]}
                                onChange={(evt) => handleChange(evt, jobType, setJobType)}
                            />
                            <label htmlFor="full-time" className="pl-3">Full Time</label>
                        </div>

                        <div className="flex items-center">
                            <input 
                                type="checkbox" 
                                id="internship"
                                name="internship"
                                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                                checked={jobType["internship"]}
                                onChange={(evt) => handleChange(evt, jobType, setJobType)}
                            />
                            <label htmlFor="internship" className="pl-3">Internship</label>
                        </div>

                        <div className="flex items-center">
                            <input 
                                type="checkbox" 
                                id="apprenticeship"
                                name="apprenticeship"
                                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                                checked={jobType["apprenticeship"]}
                                onChange={(evt) => handleChange(evt, jobType, setJobType)}
                            />
                            <label htmlFor="apprenticeship" className="pl-3">Apprenticeship</label>
                        </div>
                        
                    </form>
                </details>

                <details className="bg-[#f0ecec] shadow-xl rounded-lg px-4 py-2 mb-4" open>
                    <summary className="text-lg w-60 list-none cursor-pointer">Job Roles</summary>
                    <form className="mt-2">
                        <div className="flex items-center">
                            <input 
                                type="checkbox" 
                                id="programming"
                                name="programming"
                                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                                checked={jobRoles["programming"]}
                                onChange={(evt) => handleChange(evt, jobRoles, setJobRoles)}
                            />
                            <label htmlFor="programming" className="pl-3">Programming</label>
                        </div>

                        <div className="flex items-center">
                            <input 
                                type="checkbox" 
                                id="support"
                                name="support"
                                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                                checked={jobRoles["support"]}
                                onChange={(evt) => handleChange(evt, jobRoles, setJobRoles)}
                            />
                            <label htmlFor="support" className="pl-3">Customer Support</label>
                        </div>

                        <div className="flex items-center">
                            <input 
                                type="checkbox" 
                                id="management"
                                name="management"
                                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                                checked={jobRoles["management"]}
                                onChange={(evt) => handleChange(evt, jobRoles, setJobRoles)}
                            />
                            <label htmlFor="management" className="pl-3">Management</label>
                        </div>

                        <div className="flex items-center">
                            <input 
                                type="checkbox" 
                                id="design"
                                name="design"
                                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                                checked={jobRoles["design"]}
                                onChange={(evt) => handleChange(evt, jobRoles, setJobRoles)}
                            />
                            <label htmlFor="design" className="pl-3">Design</label>
                        </div>

                        <div className="flex items-center">
                            <input 
                                type="checkbox" 
                                id="sales"
                                name="sales"
                                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                                checked={jobRoles["sales"]}
                                onChange={(evt) => handleChange(evt, jobRoles, setJobRoles)}
                            />
                            <label htmlFor="sales" className="pl-3">Sales/Marketing</label>
                        </div>
                        
                    </form>
                </details>

                <details className="bg-[#f0ecec] shadow-xl rounded-lg px-4 py-2 mb-6" open>
                    <summary className="text-lg w-60 list-none cursor-pointer">Job Mode</summary>
                    <form className="mt-2">
                        <div className="flex items-center">
                            <input 
                                type="checkbox" 
                                id="onsite"
                                name="onsite"
                                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                                checked={jobMode["onsite"]}
                                onChange={(evt) => handleChange(evt, jobMode, setJobMode)}
                            />
                            <label htmlFor="onsite" className="pl-3">Onsite</label>
                        </div>

                        <div className="flex items-center">
                            <input 
                                type="checkbox" 
                                id="hybrid"
                                name="hybrid"
                                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dar
                                k:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                                checked={jobMode["hybrid"]}
                                onChange={(evt) => handleChange(evt, jobMode, setJobMode)}
                            />
                            <label htmlFor="hybrid" className="pl-3">Hybrid</label>
                        </div>

                        <div className="flex items-center">
                            <input 
                                type="checkbox" 
                                id="remote"
                                name="remote"
                                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                                checked={jobMode["remote"]}
                                onChange={(evt) => handleChange(evt, jobMode, setJobMode)}
                            />
                            <label htmlFor="remote" className="pl-3">Remote</label>
                        </div>
                        
                    </form>
                </details>

                <button 
                    className="bg-[#218eb1] w-[50%] px-2 py-2 rounded-md text-white"
                    onClick={applyFilters}>
                    Apply Filters
                </button>
            </div>

            <div className="w-auto">
                {jobs.map((job) => {
                    return <JobCard key={job._id} jobData={job}/>
                })}
                {!jobs.length && <p className="text-2xl">No jobs found!</p>}
            </div>
        </div>
    )
}

export default JobPage