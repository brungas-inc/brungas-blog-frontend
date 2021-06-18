import React, {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom'
import SingleComment from "./SingleComment";
import {TimeAgo} from '../components/timeAgo'
import { saveUser, selectUserData, apiConfigurations } from '../slices/userSlice'
import { useDispatch, useSelector } from 'react-redux'
import { fetchLikesByPostId, getCommentsByPostId, getSinglePostById } from '../app/api';

const BlogDetails = () => {
    const postId = useParams().id
    const [postComments, setPostComments] = useState([])
    const [postInfo, setPostInfo] = useState({})
    const [postLikes, setPostLikes] = useState([])
    const config = useSelector(apiConfigurations)
    const user = useSelector(selectUserData)

    const getPostDetails = async () => {
        try {
            const response = await getSinglePostById(postId)
            setPostInfo(response)
            } catch (error) {
            console.log('Getting Single Post ', error.response.data )
        }
    }

    const getPostLikes = async () => {
        try {
            const response = await fetchLikesByPostId(postId)
            setPostLikes(response)
            } catch (error) {
            console.log('Getting Single Post Likes', error.response.data )
        }
    }

    const getPostComments = async () => {
        try {
            const response = await getCommentsByPostId(postId, config)
            setPostComments(response)
            } catch (error) {
            console.log('Getting Single Post Comments', error.response.data )
        }
    }

    useEffect(() => {
        getPostDetails();
        getPostLikes();
        getPostComments()
    }, [postId])

    return (
        <div className="card bg-gradient">
            <div className="card-body">
                <h5 className="card-title">{postInfo.post_title}</h5>
                <blockquote className="blockquote mb-0">
                    <p>{postInfo.description}</p>
                </blockquote>
                <hr/>
                <span className="text-muted mt-2">Posted By {postInfo.username} | <TimeAgo timestamp={postInfo.date_updated} /> &nbsp; | </span>&nbsp;
                <span className="badge bg-primary">{postLikes.length} Likes</span>
                <h6 className="h6 pt-2">Comments ({postComments.length})</h6>
                {postComments.map(item => <SingleComment key={item.id} comment={item} /> )}
                
            </div>
        </div>
    );
};

export default BlogDetails;