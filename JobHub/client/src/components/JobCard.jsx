import { format, formatDistance } from "date-fns"
import { Link } from "react-router-dom"

const JobCard = ({ jobData }) => {
    
    // helper method to print the eligible batches array elements
    const prettify = (batches) => {
        let res = ""
        for (let i = 0; i < batches.length; ++i) {
            res += batches[i]
            if (i < batches.length - 1) res += ", "
        }
        return res
    }

    // helper variables to display other locations
    const locationLen = jobData.location.length
    const isLocationLenOne = (locationLen - 1) == 1

    // deadline info
    let date = jobData.deadline?.split("-")
    let formattedDeadline = ""
    if (jobData.deadline)   formattedDeadline = format(new Date(parseInt(date[0]), parseInt(date[1] - 1), parseInt(date[2])), "do MMM, yyyy")

    // date posted info
    let datePosted = jobData.createdAt
    let datePostedFormatted = formatDistance(datePosted, new Date(), {addSuffix: true})

    return (
        <div className="md:bg-[#f0ecec] px-10 py-6 rounded-2xl mb-7 md:shadow-primary">
            <div className="flex gap-5 mb-5">
                <div className="self-center bg-gray-300 h-12 w-12 rounded-full text-3xl flex items-center justify-center">{jobData.company[0]}</div>
                <div>
                    <h3 className="font-semibold text-xl">{jobData.title}</h3>
                    <p>{jobData.company} | {jobData.location[0]}, {jobData.country} {locationLen > 1? (`and ${locationLen - 1} ` + (isLocationLenOne? `other` : `others`)) : null}</p>
                </div>
            </div>

            <div className="flex gap-3 mb-5">
                {jobData.skills.map((skill) => {
                    return <span className="bg-gray-300 px-3 py-1 rounded-full text-sm">{skill}</span>
                })}
            </div>

            <div className="flex text-sm mb-5">
                <div className="border-r-2 border-gray-300 pr-3">
                    <p>Batches Eligible</p>
                    <p>{prettify(jobData.eligibleBatches)}</p>
                </div>
                <div className="border-r-2 border-gray-300 px-3">
                    <p>{jobData.type === 'full-time' ? 'YOE' : 'Duration'}</p>
                    <p>{jobData.type === 'full-time' ? `${(jobData.requiredExperience / 12)}+ years` : `${jobData.duration} months`}</p>
                </div>
                <div className="border-r-2 border-gray-300 px-3">
                    <p>Mode</p>
                    <p>{jobData.mode[0].toUpperCase() + jobData.mode.slice(1)}</p>
                </div>
                <div className="border-r-2 border-gray-300 px-3">
                    <p>Start Date</p>
                    <p>{jobData.startDate == null ? "Immediate" : jobData.startDate}</p>
                </div>
                <div className="border-r-2 border-gray-300 px-3">
                    <p>Deadline</p>
                    <p>{jobData.deadline? `${jobData.deadline}` : `Apply ASAP`}</p>
                </div>
                <div className="pl-3">
                    <p>{jobData.type === 'full-time' ? 'Salary' : 'Stipend'}</p>
                    <p>₹ {jobData.type === 'full-time' ? ((jobData.salary / 100000) + "L") : jobData.stipend}</p>
                </div>
            </div>

            <div className="flex justify-between items-center">
                <span className="text-base font-medium">Posted {datePostedFormatted}</span>
                <Link className="bg-[#1196c2] text-white px-3 py-2 rounded-md transition ease-in duration-300 md:hover:bg-[rgb(36,131,163)]" to={jobData.applyLink} target="_blank">Apply Now</Link>
            </div>
        </div>
    )
}

export default JobCard