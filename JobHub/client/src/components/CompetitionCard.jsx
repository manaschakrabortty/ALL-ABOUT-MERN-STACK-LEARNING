import { format, formatDistance } from "date-fns"
import { Link } from "react-router-dom"

const CompetitionCard = ({data}) => {

    // eligibility information
    let eligibility = ''
    if (data.eligibility === 'collegeStudents')   eligibility = 'College Students'
    else if (data.eligibility === 'professionals')  eligibility = 'Professionals'
    else    eligibility = 'Startups'

    // deadline info
    let date = data.deadline?.split("-")
    let formattedDeadline = ""
    if (data.deadline)   formattedDeadline = format(new Date(parseInt(date[0]), parseInt(date[1] - 1), parseInt(date[2])), "do MMM, yyyy")

    // date posted info
    let datePosted = data.createdAt
    let datePostedFormatted = formatDistance(datePosted, new Date(), {addSuffix: true})


    return (
        <div className="md:bg-[#f0ecec] px-8 py-6 rounded-2xl mb-7 md:shadow-primary">
            <div className="flex gap-5 mb-5">
                <div className="self-center bg-gray-300 h-12 w-12 rounded-full text-3xl flex items-center justify-center">{data.company[0]}</div>
                <div>
                    <h3 className="font-semibold text-xl">{data.title}</h3>
                    <p>{data.company} | {data.country}</p>
                </div>
            </div>

            <div className="flex text-sm mb-5">
                <div className="border-r-2 border-gray-300 pr-3">
                    <p>{eligibility}</p>
                </div>
                <div className="border-r-2 border-gray-300 px-3">
                    <p>{data.mode[0].toUpperCase() + data.mode.slice(1)}</p>
                </div>
                <div className="border-r-2 border-gray-300 px-3">
                    <p>{data.type}</p>
                </div>
                <div className="border-r-2 border-gray-300 px-3">
                    <p>{data.prize}+ Prizes</p>
                </div>
                <div className="pl-3">
                    <p>PPI Opportunities</p>
                </div>
            </div>

            <div className="flex justify-between items-center">
                <span className="text-base font-medium">Apply by {formattedDeadline} | Posted {datePostedFormatted}</span>
                <Link className="bg-[#1196c2] text-white px-3 py-2 rounded-md transition ease-in duration-300 md:hover:bg-[rgb(36,131,163)]" to={data.applyLink} target="_blank">Apply Now</Link>
            </div>
        </div>
    )
}

export default CompetitionCard