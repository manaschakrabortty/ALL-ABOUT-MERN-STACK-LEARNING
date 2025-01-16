import { Link } from "react-router-dom"
import { UserContext } from "../context/UserContext"
import { useContext } from "react"

const IndexPage = () => {
    const {userInfo} = useContext(UserContext)

    return (
        <div className="flex h-[80vh] w-full overflow-hidden">
            <div className="py-20 px-10 md:py-24 md:px-20 md:max-w-[60%] md:mx-auto">
                <h2 className="text-4xl font-semibold text-center">One Stop Destination <br />To Your First Job</h2>

                <p className="mt-4 text-xl text-center">Your one-stop destination for off campus career opportunities.</p>

                <div className="flex mt-10 justify-center gap-4">
                    {!userInfo && 
                        <Link 
                            className ="px-5 py-3 rounded-md bg-[#1196c2] text-white transition ease-in duration-300 md:hover:bg-[rgb(36,131,163)]"
                            to="/register">
                            Get Started
                        </Link>
                    }

                    {userInfo && 
                        <Link 
                            className ="px-5 py-3 rounded-md bg-[#1196c2] text-white transition ease-in duration-300 md:hover:bg-[rgb(36,131,163)]"
                            to="/competitions">
                            Hackathons
                        </Link>
                    }

                    <Link 
                        className ="px-5 py-3 rounded-md bg-[#1196c2] text-white transition ease-in duration-300 md:hover:bg-[rgb(36,131,163)]"
                        to="/jobs">
                        Find Jobs
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default IndexPage