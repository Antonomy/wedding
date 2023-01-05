import './NavBar.scss';
import { Link } from 'react-router-dom';
import { logOut } from '../../utilities/users-service'
import companyLogo from './images/companyLogoSmall.png'


export default function NavBar() {
  
  return (
      
      <nav>
        
      <Link to="/"><img className="logo" src={companyLogo} alt= "Logo"></img></Link>
        <Link to="/eventinfo">Event Info</Link>
        &nbsp; | &nbsp;
        <Link to="/livestream">Livestream</Link>
        &nbsp; | &nbsp;
        <Link to="/guestbook/create">Sign the Guestbook</Link>
        &nbsp; | &nbsp;
        <Link to="/albums/create">Create Album</Link>
        &nbsp; | &nbsp;
        <Link to="/registry">Registry</Link>
        <button onClick={logOut}> Sign Out </button>
      </nav>
  );
}