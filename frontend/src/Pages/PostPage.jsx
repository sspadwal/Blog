import { formatISO9075 } from 'date-fns';
import  { useContext, useEffect, useState } from 'react'
import { NavLink, useParams } from 'react-router-dom';
import { UserContext } from '../userContext';

function PostPage() {
    const [postInfo, setPostInfo] = useState(null);
    const { userInfo } = useContext(UserContext)
    const { id } = useParams();

    useEffect(() => {
        fetch(`http://localhost:3000/post/${id}`)
            .then((response) => {
                response.json().then(postInfo => {
                    setPostInfo(postInfo)
                })
            })
    }, [id])
    if (!postInfo) return '';
    return (
        <div className='post-page'>
            <h1>{postInfo.title}</h1>
            <time>{formatISO9075(new Date(postInfo.createdAt))}</time>
            <div className='author'> by @{postInfo.author.username}</div>
            {userInfo._id === postInfo.author._id && (
                <div className='edit-row'>
                    <NavLink className='edit-btn' to={`/edit/${postInfo._id}`}> Edit This Post</NavLink>
                </div>
            )}
            <div className='image'>
                <img src={`http://localhost:3000/${postInfo.cover}`} />
            </div>
            <div className='content' dangerouslySetInnerHTML={{ __html: postInfo.content }} />
        </div>
    )
}

export default PostPage
