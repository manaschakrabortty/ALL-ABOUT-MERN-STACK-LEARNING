import { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { UserContext } from "../context/UserContext"
import axios from "axios"
import Spinner from "../components/Spinner"
import CompetitionCard from "../components/CompetitionCard"

const CompetitionPage = () => {

    // states for filters
    const [type, setType] = useState({
        "Coding Challenge": false, 
        "Hackathon": false, 
    })
    const [mode, setMode] = useState({ 
        "online": false,
        "offline": false
    })
    const [eligibility, setEligibility] = useState({
        "collegeStudents": false, 
        "professionals": false, 
        "startups": false
    })

    // managing states for the filter checkboxes
    const handleChange = (evt, obj, setObj) => {
        const {name} = evt.target
        const oldValue = obj[name]
        setObj((oldType) => {
            return {...oldType, [name]: !oldValue}
        })
    }

    // all comps fetched from backend
    const [competitions, setCompetitions] = useState([])
    const {userInfo} = useContext(UserContext)
    const navigate = useNavigate()

    // page loader
    const [pageLoading, setPageLoading] = useState(true)

    useEffect(() => {
        if(!userInfo)   navigate('/login', {state: {from: '/competitions'}})
        else getAllCompetitions()
    }, [navigate, userInfo])

    const getAllCompetitions = async () => {
        try {
            const {data} = await axios.get('/competition')
            setCompetitions(data)
        }
        catch (err) { console.log(err) }
        setPageLoading(false)
    }

    // gets filtered jobs from backend
    const applyFilters = async () => {
        setPageLoading(true)

        let typeQueries = Object.keys(type).filter(key => type[key])
        let modeQueries = Object.keys(mode).filter(key => mode[key])
        let eligibilityQueries = Object.keys(eligibility).filter(key => eligibility[key])

        let queryObject = {}
        if (typeQueries.length)     queryObject.type = typeQueries
        if (modeQueries.length)     queryObject.mode = modeQueries
        if (eligibilityQueries.length)     queryObject.eligibility = eligibilityQueries

        const params = new URLSearchParams(queryObject)

        try {
            console.log(params.toString())
            const {data} = await axios.get(`/competition?${params.toString()}`)
            console.log(data)
            setCompetitions(data)
        }
        catch (err) { console.log(err) }

        setPageLoading(false)
    }

    if (pageLoading)    return <Spinner loading={pageLoading} />

    return (
        <div className="flex gap-20 px-20 mt-5">
            <div className="">
                <details className="bg-[#f0ecec] shadow-xl rounded-lg px-4 py-2 mb-4" open>
                    <summary className="text-lg w-60 list-none cursor-pointer">Type</summary>
                    <form className="mt-2">
                        <div className="flex items-center">
                            <input 
                                type="checkbox" 
                                id="hackathon"
                                name="Hackathon"
                                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                                checked={type["Hackathon"]}
                                onChange={(evt) => handleChange(evt, type, setType)}
                            />
                            <label htmlFor="hackathon" className="pl-3">Hackathon</label>
                        </div>

                        <div className="flex items-center">
                            <input 
                                type="checkbox" 
                                id="coding-challenge"
                                name="Coding Challenge"
                                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                                checked={type["Coding Challenge"]}
                                onChange={(evt) => handleChange(evt, type, setType)}
                            />
                            <label htmlFor="coding-challenge" className="pl-3">Coding Challenge</label>
                        </div>

                    </form>
                </details>

                <details className="bg-[#f0ecec] shadow-xl rounded-lg px-4 py-2 mb-4" open>
                    <summary className="text-lg w-60 list-none cursor-pointer">Event Mode</summary>
                    <form className="mt-2">
                        <div className="flex items-center">
                            <input 
                                type="checkbox" 
                                id="online"
                                name="online"
                                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                                checked={mode["online"]}
                                onChange={(evt) => handleChange(evt, mode, setMode)}
                            />
                            <label htmlFor="online" className="pl-3">Online</label>
                        </div>

                        <div className="flex items-center">
                            <input 
                                type="checkbox" 
                                id="offline"
                                name="offline"
                                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                                checked={mode["offline"]}
                                onChange={(evt) => handleChange(evt, mode, setMode)}
                            />
                            <label htmlFor="offline" className="pl-3">Offline</label>
                        </div>
                        
                    </form>
                </details>

                <details className="bg-[#f0ecec] shadow-xl rounded-lg px-4 py-2 mb-6" open>
                    <summary className="text-lg w-60 list-none cursor-pointer">Eligibility</summary>
                    <form className="mt-2">
                        <div className="flex items-center">
                            <input 
                                type="checkbox" 
                                id="professionals"
                                name="professionals"
                                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                                checked={eligibility["professionals"]}
                                onChange={(evt) => handleChange(evt, eligibility, setEligibility)}
                            />
                            <label htmlFor="professionals" className="pl-3">Professionals</label>
                        </div>

                        <div className="flex items-center">
                            <input 
                                type="checkbox" 
                                id="startups"
                                name="startups"
                                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                                checked={eligibility["startups"]}
                                onChange={(evt) => handleChange(evt, eligibility, setEligibility)}
                            />
                            <label htmlFor="startups" className="pl-3">Startups</label>
                        </div>

                        <div className="flex items-center">
                            <input 
                                type="checkbox" 
                                id="collegeStudents"
                                name="collegeStudents"
                                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                                checked={eligibility["collegeStudents"]}
                                onChange={(evt) => handleChange(evt, eligibility, setEligibility)}
                            />
                            <label htmlFor="collegeStudents" className="pl-3">College Students</label>
                        </div>
                        
                    </form>
                </details>

                <button className="bg-[#218eb1] w-[50%] px-2 py-2 rounded-md text-white" onClick={applyFilters}>Apply Filters</button>
            </div>

            <div className="w-auto">
                {competitions.map((competition) => {
                    return <CompetitionCard data={competition} key={competition._id}/>
                })}
                {!competitions.length && <p className="text-2xl">No competitions found!</p>}

            </div>
        </div>
    )
}

export default CompetitionPage