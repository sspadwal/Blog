
import { useContext, useEffect } from "react";
import { NavLink } from "react-router-dom"; // Import NavLink with curly braces
import { UserContext } from "./userContext";

function Header() {
    const {setUserInfo,userInfo} = useContext(UserContext)
    useEffect(()=>{

        fetch('http://localhost:3000/profile',{

            credentials:'include'        
        }).then(response =>{
            response.json().then(userInfo =>{
                setUserInfo(userInfo)
            })
        })

    },[])


    function logout(){
        fetch('http://localhost:3000/logout',{
            credentials:'include',
            method:'POST'
        })
        setUserInfo(null)
    }

    const username= userInfo?.username;

    return (
        <header>
            <NavLink to="/" className='logo'>MyBlog</NavLink>
            <nav>

                {
                    username && (
                        <>
                        <NavLink to='/create'>Create new Blog </NavLink>
                        <a onClick={logout}>logout ({username})</a>
                        </>

                    )
                }
                {
                    !username && (
                        <>
                        <NavLink to="/login">Login</NavLink>
                        <NavLink to="/register">Register</NavLink>
                        
                        </>
                    )
                }
            </nav>
        </header>
    );
}

export default Header;
