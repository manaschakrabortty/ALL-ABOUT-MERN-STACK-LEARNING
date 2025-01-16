import PropagateLoader from "react-spinners/PropagateLoader"

const Spinner = ({loading}) => {
    return (
        <div className="h-[65vh] flex justify-center items-center">
            <PropagateLoader
                loading={loading}
                size={35}
                color={"#218eb1"}
            />
        </div>
    )
}

export default Spinner