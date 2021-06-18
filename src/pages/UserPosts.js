import React, {useState, useEffect} from 'react';
import { useSelector, useDispatch}  from 'react-redux'
import { saveUser, selectUserData, apiConfigurations } from '../slices/userSlice'
import { addPost, getPostsByUserId } from '../app/api';import ViewPostTable from "./ViewPostTable";
import AddNewPostForm from "./AddNewPostForm";

const UserPosts = () => {

    const user = useSelector(selectUserData)
    const initialPostInfo = {
        user: user.userId,
        post_title: '',
        description: '',
        is_active: ''
    }
    const config = useSelector(apiConfigurations)
    const [postInfo, setPostInfo] = useState(initialPostInfo)
    const [postFormErrorMessage, setPostFormErrorMessage] = useState('')
    const [isSendingPost, setIsSendingPost] = useState(false)

    const handlePostFormChanges = (e) => {
        setPostFormErrorMessage('')
        if (e.target.name === 'is_active') {
            setPostInfo({
                ...postInfo,
                is_active: parseInt(e.target.value) === 1 ? false : true 
            })
        }
        else {
            setPostInfo({
                ...postInfo,
                [e.target.name] : e.target.value
            })
        }
    }

    const postFormValidator = () => {
        if (!postInfo.post_title) {
            setPostFormErrorMessage('Post Title Cannot Be Blank!')
            return false
        }
        else if (!postInfo.description) {
            setPostFormErrorMessage('Post Description Cannot Be Blank!')
            return false
        }
        else if (postInfo.is_active === '') {
            setPostFormErrorMessage('Select Post Status')
            return false
        }
        else {
            setPostFormErrorMessage('')
            return true
        }
    }

    const sendPost = async (e) => {
        e.preventDefault();
        const isPostFormValid = postFormValidator()

        if (isPostFormValid) {
            setIsSendingPost(true)
            try {
                // console.log(postInfo)
                const response = await addPost(postInfo, config)
                // getUserPosts()
                setIsSendingPost(false)
                setPostInfo(initialPostInfo)
            } catch (error) {
                console.log('Creating New Post ', error.response.data)
                setIsSendingPost(false)
                setPostFormErrorMessage('Ooops...!, Some Error Occured. Please Try Again.')
            }
        }
        else {
            console.log('Post Form Is Not Valid ')
        }

    }

    useEffect(() => {
        // getUserPosts()
    }, [])

    return (
        <div className="row p-lg-3 justify-content-center">
            <div className="col-sm-12 col-md-12 col-lg-12 ">
                <button
                    className="btn btn-primary btn-sm float-end"
                    data-bs-toggle="modal" data-bs-target="#add-post">
                    <i className="fa fa-plus" /> Add New Post
                </button>
            </div>
            <div className="col-sm-12 col-md-12 col-lg-12 ">
                <ViewPostTable />
            </div>
            {/*Modal To Add Post*/}
            <div className="modal fade" id="add-post" tabIndex="-1" aria-labelledby="add-post"
                 aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Add New Post</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"
                                    aria-label="Close" />
                        </div>
                        <div className="modal-body">
                            <AddNewPostForm onFinish={sendPost} onFormChange={handlePostFormChanges} info={postInfo} isSending={isSendingPost} errorMessage={postFormErrorMessage} />
                        </div>
                    </div>
                </div>
            </div>
            {/*Modal To Add new post end here*/}
        </div>
    );
};

export default UserPosts;