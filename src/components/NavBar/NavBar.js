import './NavBar.scss'
import { Link } from 'react-router-dom'
import { logOut } from '../../utilities/users-service'
import companyLogo from './images/companyLogoSmall.png'

export default function NavBar ({ setUser }) {
  function handleLogOut () {
    logOut()
    setUser(null)
  }
  return (

    <nav>
      <Link to='/'><img className={StyleSheet.navLogo} src={companyLogo} alt='Logo' /></Link>
      <Link to='/eventinfo'>event info</Link>
        &nbsp; | &nbsp;
      <Link to='/video'>video</Link>
        &nbsp; | &nbsp;
      <Link to='/guestbook'>guestbook</Link>
        &nbsp; | &nbsp;
      <Link to='/albums'>album</Link>
        &nbsp; | &nbsp;
      <Link to='/registry'>registry</Link>
        &nbsp; | &nbsp;
      <Link to='/profile'>profile</Link>
      <button onClick={handleLogOut}> Sign Out </button>
    </nav>
  )
}
