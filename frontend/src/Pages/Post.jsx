import {formatISO9075} from 'date-fns'
import {NavLink} from 'react-router-dom'

function Post({_id,title,summary,cover,content,createdAt,author}) {
  return (
    <div className="post">
      <div className="image">
        <NavLink to={`/post/${_id}`}>
        <img src={'http://localhost:3000/'+cover} alt="" />

        </NavLink>

      </div>

      <div className="texts">
        <NavLink  to={`/post/${_id}`} >
        <h2>{title}</h2>

        </NavLink>
        <p className="info">
          <span className="author">
            <a href=""> {author.username} </a>
            <time>{formatISO9075(new Date(createdAt))} </time>
          </span>
        </p>
        <p className='summary'>{summary} </p>

      </div>
    </div>
  )
}

export default Post;
