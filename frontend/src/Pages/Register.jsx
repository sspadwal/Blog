import { useState } from "react"

function RegisterPage() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    // console.log(username,password);

    async function register(ev) {

        ev.preventDefault();


   

           const response= await fetch('http://localhost:3000/register', {
                method: 'POST',
                body: JSON.stringify({ username, password }),

                headers: { 'Content-Type': 'application/json' }
            })
            
            

            if( response.status === 200){
                alert("Registration Successed!!!")
                setUsername('');
                setPassword('');
            }
            else{
                alert("Registration Failed ")
            }

        

    }

    return (
        <>

            <form className="register">
                <h1> Register </h1>
                <input type="text"
                    placeholder="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />

                <input type="text"
                    placeholder="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />


                <button onClick={register}> Register</button>

            </form>
        </>
    )
}

export default RegisterPage
