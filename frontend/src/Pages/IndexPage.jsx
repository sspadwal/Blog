// import React from 'react'
import { useEffect, useState } from 'react'
import Post from './Post'

function IndexPage() {
    const [posts,setPosts] = useState([])

    useEffect(()=>{
        fetch('http://localhost:3000/post').then(response=>{
            response.json().then(posts=>{
                setPosts(posts)
            })
        })
    },[])

    return (
        <>
        {
            posts.length > 0 && posts.map((post,index)=>(
                <Post key={index} {...post}/>
            ))
        }
        </>
    )
}

export default IndexPage
