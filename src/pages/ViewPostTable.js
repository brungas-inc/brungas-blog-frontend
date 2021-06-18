import React, {useState, useEffect} from 'react';
import { useSelector, useDispatch}  from 'react-redux'
import { saveUser, selectUserData, apiConfigurations } from '../slices/userSlice'
import { getPostsByUserId, deletePost, editPost, fetchAllComments } from '../app/api';
import UpdatePostForm from "./UpdatePostForm";
import AddNewPostForm from "./AddNewPostForm";

const ViewPostTable = ({onFormChange, postFormErrorMessage}) => {

    const user = useSelector(selectUserData)
    const config = useSelector(apiConfigurations)
    const [allComments, setAllComments] = useState([])
    const [userPosts, setUserPosts] = useState([])
    const [selectedPost, setSelectedPost] = useState({})
    const [isEditing, setIsEditing] = useState(false)
    const [postEditingErrorMessage, setPostEditingErrorMessage] = useState('')
    const [activePost, setActivePost] = useState({})

    const getUserPosts = async () => {
        try {
            const response = await getPostsByUserId(user.userId, config)
            setUserPosts(response)
        } catch (error) {
            console.log('Getting Posts By UserId ', error.response.data)
        }
    }

    const getAllComments = async () => {
        try {
            const response = await fetchAllComments()
            setAllComments(response)
        } catch (error) {
            console.log('Getting All Comments ', error.response.data)
        }
    }

    const countPostComments = (postId) => {
        let post_comments = allComments.filter(item => item.post === postId)
        return post_comments.length
    }

    const deleteSinglePost = async (postId) => {
        console.log('id ', postId)
        try {
            const response = await deletePost(postId, config)
            getUserPosts()
        } catch (error) {
            console.log('Deleting Single Post ', error.response.data)
        }
    }


    useEffect(() => {
        getUserPosts();
        getAllComments()
    }, [])

    const handlePostFormChanges = (e) => {
        setPostEditingErrorMessage('')
        if (e.target.name === 'is_active') {
            setSelectedPost({
                ...selectedPost,
                is_active: parseInt(e.target.value) === 1 ? false : true 
            })
        }
        else {
            setSelectedPost({
                ...selectedPost,
                [e.target.name] : e.target.value
            })
        }
    }

        const postFormValidator = () => {
        if (!selectedPost.post_title) {
            setPostEditingErrorMessage('Post Title Cannot Be Blank!')
            return false
        }
        else if (!selectedPost.description) {
            setPostEditingErrorMessage('Post Description Cannot Be Blank!')
            return false
        }
        else if (selectedPost.is_active === '') {
            setPostEditingErrorMessage('Select Post Status')
            return false
        }
        else {
            setPostEditingErrorMessage('')
            return true
        }
    }
  const editSinglePost = async (e) => {
        e.preventDefault();
        const isPostFormValid = postFormValidator()

        if (isPostFormValid) {
            setIsEditing(true)
            try {
                const response = await editPost(selectedPost, config)
                const newList = userPosts.map(post => post.id === response.id ? response : post)
                setUserPosts(newList)
                // getUserPosts()
                setIsEditing(false)
                setSelectedPost({})
            } catch (error) {
                console.log('Editing Single Post ', error.response.data)
                setIsEditing(false)
                setPostEditingErrorMessage('Ooops...!, Some Error Occured. Please Try Again.')
            }
        }
        else {
            console.log('Post Form Is Not Valid ')
        }
    }

    return (
        <React.Fragment>
            <div className="table-responsive-sm">
                <table className="table table-hover table-striped">
                    <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Title</th>
                        <th scope="col">Description</th>
                        <th scope="col">Date Posted</th>
                        <th scope="col">Total Comments</th>
                        <th scope="col">Status</th>
                        <th scope="col" style={{textAlign: "center"}}>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                        {userPosts.map((post, index )=> (
                    <tr key={post.id}
                                onMouseEnter={e => { e.preventDefault(); setActivePost(post)}}
                                onMouseLeave={e => { e.preventDefault(); setActivePost({})}}>
                        <th scope="row">{index + 1}</th>
                        <td>{post.post_title.substr(0,10)}...</td>
                        <td>{post.description.substr(0,10)}...</td>
                        <td>{post.date_updated.substr(0,10)}</td>
                                <td>{countPostComments(post.id)}</td>
                        <td>{post.is_active ? 'public' : 'private'}</td>
                        <td>
                        <span className="float-end" hidden={activePost.id !== post.id}>
                            <button  data-bs-toggle="modal"
                                            data-bs-target="#edit-post"
                                            onClick={e => { e.preventDefault(); setSelectedPost(post)}}
                                     className="btn btn-sm btn-success">
                                <i className="fa fa-edit"/> Update
                            </button>
                            &nbsp;&nbsp;
                            <button onClick={e => { e.preventDefault(); deleteSinglePost(post.id)}} className="btn btn-sm btn-danger">
                                <i className="fa fa-trash"/> Delete
                            </button>
                        </span>
                        </td>
                    </tr> ))}
                    </tbody>
                </table>
            </div>
            <div className="modal fade" id="edit-post" tabIndex="-1" aria-labelledby="edit-post"
                 aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Edit Post Details</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"
                                    aria-label="Close" />
                        </div>
                        <div className="modal-body">
                            <AddNewPostForm onFinish={editSinglePost} onFormChange={handlePostFormChanges} info={selectedPost} isSending={isEditing} errorMessage={postEditingErrorMessage} />
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
};

export default ViewPostTable;