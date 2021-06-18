import React from 'react';
import {TimeAgo} from '../components/timeAgo'

const SingleComment = ({comment}) => {
    return (
        <div className="list-group border-0 p-1 mt-1">
            <span className="list-group-item list-group-item-action">
                <div className="mb-1">
                    <span>
                        <img width="30" height="30"
                             className="m-2 rounded-circle"
                             src="https://pbs.twimg.com/media/EXfjc-JXsAAEa3s.jpg"
                             alt="avatar" />
                    </span>
                    {comment.comment_text} 
                </div>
                <div className="d-flex w-100 justify-content-between">
                    <small className="text-muted">{comment.username} | <TimeAgo timestamp={comment.date_commented} /> </small>
                </div>
            </span>
        </div>
    );
};

export default SingleComment;