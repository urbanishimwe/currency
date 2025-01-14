import Logo from "./Logo"
import Socials from "./Socials"

const Footer = () => {
    return (
        <div className="flex md:flex-row p-8 items-center justify-between w-full flex-col">
            <Logo/>
            <span className="dark:text-white font-semibold italic"> © 2024 rwfCurrency </span>
            <Socials/>
        </div>
    )
}

export default Footer;
