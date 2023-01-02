// AuthPage.js

import SignUpForm from "../../components/SignUpForm/SignUpForm"
import LoginForm from "../../components/LoginForm/LoginForm"
import './AuthPage.module.scss';

export default function AuthPage(props){
    return(
        <main>
            <h1>Sign Up or Log in to see your photos</h1>
            <SignUpForm setUser={props.setUser}/>
            <LoginForm setUser={props.setUser}/>
        </main>
    )
}