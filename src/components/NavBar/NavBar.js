import './NavBar.scss';
import { Link } from 'react-router-dom';
import { logOut } from '../../utilities/users-service'
import companyLogo from './images/companyLogoSmall.png'


export default function NavBar() {
    
  return (
    <header>
      <Link to="/dashboard"><img className="logo" src={companyLogo} alt= "Photography Logo"></img></Link>
      <nav>
        <Link to="/dashboard">Dashboard</Link>
        &nbsp; | &nbsp;
        <Link to="/guestbook/create">Sign the Guestbook</Link>
        &nbsp; | &nbsp;
        <Link to="/albums/create">Create Album</Link>
        <button onClick={() => logOut()}> Sign Out </button>
      </nav>
    </header>
  );
}