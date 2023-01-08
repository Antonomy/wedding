import { useState } from 'react'
import styles from './AuthPage.module.scss'
import LoginForm from '../../components/LoginForm/LoginForm'
import SignUpForm from '../../components/SignUpForm/SignUpForm'
import companyLogo from './images/companyLogo.png'

export default function AuthPage ({ setUser }) {
  const [showLogin, setShowLogin] = useState(true)

  return (
    <main className={styles.AuthPage}>
      <div className={styles.AuthPanelLeft}>
        <img className={styles.authLogo} src={companyLogo} alt='Logo' />
        <h3 onClick={() => setShowLogin(!showLogin)}>{showLogin ? 'SIGN UP' : 'LOG IN'}</h3>
      </div>
      {showLogin ? <LoginForm setUser={setUser} /> : <SignUpForm setUser={setUser} />}
    </main>
  )
}
