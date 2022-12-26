import React from 'react'
import { Link } from 'react-router-dom';

const Post = props => (
    <Link to={`/post/${props.id}`}>
        <div className="post">
            <img src={props.img} />
            <div className="postTitle">{props.title}</div>
            <div className="postDescription">{props.descr}</div>
        </div>
    </Link>
)

export default Post