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
        <div className="rounded-2xl dark:bg-slate-800 bg-slate-300 w-16 h-6" onClick={handleChangeTheme}>
            <div className="dark:bg-slate-50 bg-slate-800 h-6 rounded-2xl w-6 dark:float-right transition-float duration-1000"/>
        </div>
    )
}




export default ColorTheme;
