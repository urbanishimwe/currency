const ColorTheme = () => {

    function handleChangeTheme(e) {
        e.stopPropagation();
        const rootDiv = document.getElementById("root");
        if (rootDiv.classList.contains('dark')) {
            rootDiv.classList.remove('dark');
        } else {
            rootDiv.classList.add('dark');
        }
    }

    return (
        <div className="rounded-2xl dark:bg-slate-800 bg-white w-12 h-6 cursor-pointer" onClick={handleChangeTheme}>
            <div className="dark:bg-white bg-slate-800 h-6 rounded-2xl w-6 dark:float-right transition-float duration-1000"/>
        </div>
    )
}




export default ColorTheme;
