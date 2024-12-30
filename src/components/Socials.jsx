import FacebookSVG from '../assets/facebook.svg'
import InstagramSVG from '../assets/instagram.svg'
import LinkedinSVG from '../assets/linkedin.svg'
import TwitterSVG from '../assets/twitter.svg'

const Socials = () => {
	return (
		<div className="flex flex-row">
			<img src={FacebookSVG} className='w-8'/>
			<img src={InstagramSVG} className='w-8'/>
			<img src={LinkedinSVG} className='w-8'/>
			<img src={TwitterSVG} className='w-8'/>
		</div>
	)
}

export default Socials;