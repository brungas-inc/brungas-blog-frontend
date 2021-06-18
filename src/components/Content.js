import React, {useState} from 'react';
import {Link} from "react-router-dom";
import { TimeAgo } from './timeAgo'
import { useSelector, useDispatch}  from 'react-redux'
import { saveUser, selectUserData, apiConfigurations } from '../slices/userSlice'
import { addLike, deleteLike } from '../app/api';

const Content = ({posts, likes, pullLikes}) => {

    const postList = posts
    const allLikes = likes
    const user = useSelector(selectUserData)
    const isLogged = user.isAuthenticated;
    const config = useSelector(apiConfigurations)
    const [isSendingLike, setIsSendingLike] = useState(false)
    const [activePost, setActivePost] = useState({})

    const getPostLikes = (postId) => {
        const requiredLikes = allLikes.filter(item => item.likepost === postId)
        return requiredLikes
    }
    
    const hasLikedThisPost = (postId) => {
        let post_likes = allLikes.filter(item => item.likepost === postId)
        let hasLiked = post_likes.find(item => item.likeusers === user.userId)
        return hasLiked

    }

    const sendPostLike = async (postId) => {
        setIsSendingLike(true)
        let hasLiked = hasLikedThisPost(postId)
        if (hasLiked) {
            try {
                const response = await deleteLike(hasLiked.id, config)
                setIsSendingLike(false)
                pullLikes()
            } catch (error) {
                console.log('Deleting Post Like ', error.response.data)
                setIsSendingLike(false)
            }
        }
        else {
            const payload = {
                likeusers: user.userId,
                likepost: postId
            }
            try {
                const response = await addLike(payload, config)
                setIsSendingLike(false)
                pullLikes()
            } catch (error) {
                setIsSendingLike(false)
                console.log('Adding Post Like ', error.response.data)
            }
        }
        setActivePost({})
    }

    return (
        <React.Fragment>
            {postList.map(post => (
                <div style={{ borderRadius: "8px" }} className="card mb-3">
                    <div className="row g-0" key={post.id}>
                        <div className="col-md-1">
                            <img width="90" height="90" className="m-2 rounded-circle"  src="https://pbs.twimg.com/media/EXfjc-JXsAAEa3s.jpg" alt="avatar" />
                        </div>
                        <div className="col-md-11">
                            <div className="card-body">
                                <h5 className="card-title">{post.post_title}</h5>
                                <p className="card-text">{post.description}</p>
                                <p className="card-text">
                                    <small className="text-muted">{post.username} &nbsp; 
                                        | <TimeAgo timestamp={post.date_updated} /> &nbsp;  |
                                        <span disabled={!isLogged} hidden={isSendingLike && activePost.id === post.id} onClick={e => { e.preventDefault(); sendPostLike(post.id); setActivePost(post)}} style={{paddingLeft: "8px", color: `${hasLikedThisPost(post.id) ? 'blue' : ''}`}}>
                                            <i style={{ fontSize: 16 }} className="fa fa-thumbs-up" /> &nbsp; |&nbsp;
                                        </span>
                                        <span className="badge bg-primary">{getPostLikes(post.id).length} Likes</span>
                                    </small>
                                    <Link to={{ pathname: `/blog/${post.id}` }} className="btn btn-primary btn-sm float-end">Read more...</Link>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
            <span>{postList.length ? '' : <i>Fetching Data...</i>}</span>
        </React.Fragment>
    );
};

export default Content;