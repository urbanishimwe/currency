const Loading = ({ sizeClass }) => {
    return (

        <div className={`rounded-full ${sizeClass} dark:bg-white bg-green-700 animate-ping`}></div>

    )
}

export default Loading;
