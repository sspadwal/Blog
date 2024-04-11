import { useContext, useState } from "react";
import {useNavigate} from 'react-router-dom'
import { UserContext } from "../userContext";

function Login() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const {setUserInfo} = useContext(UserContext)
    const navigate=useNavigate();

    async function login(e) {
        e.preventDefault();

       const response= await fetch('http://localhost:3000/login', {

            method: "POST",
            body: JSON.stringify({ username, password }),
            headers: { "Content-Type": "application/json" },
            credentials:'include'
        })

        if(response.ok){
            alert("Login Successful")
            response.json().then(userInfo =>{
                setUserInfo(userInfo)    
                navigate('/')
                setUsername('')
                setPassword('')
            })
        }
        else{
            alert("login failed")
        }

    }

    return (
        <>
            <form className="login">
                <h1> Login Page </h1>
                <input
                    type="text"
                    placeholder="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />

                <input
                    type="text"
                    placeholder="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)} />
                <button onClick={login}>Login</button>

            </form>
        </>
    )
}

export default Login
