import ColorTheme from "./ColorTheme";
import Logo from "./Logo";

const Header = () => {
    return (
        <div className="dark:bg-slate-900 bg-gray-100 flex flex-row justify-between items-center h-16 w-9/12 p-8">
            <Logo/>
            <ColorTheme />
        </div>
    )
}

export default Header;
