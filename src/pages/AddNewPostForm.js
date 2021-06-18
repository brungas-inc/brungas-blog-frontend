import React from 'react';
import InputControl from "../controls/InputControl";
import TextareaControl from "../controls/TextareaControl";
import SelectControl from "../controls/SelectControl";

const options = [
    {id: 1, title: "Private"},
    {id: 2, title: "Public"},
];

const AddNewPostForm = ({info, onFormChange, onFinish, isSending, errorMessage}) => {
    return (
        <div className="row p-lg-3 justify-content-center">
            <div className="container-fluid">
                <div className="col-sm-12 col-md-12 col-lg-12 ">
                    <InputControl
                        label="Post Title"
                        placeholder="Enter your post title"
                        name="post_title"
                        value={info.post_title}
                        onChange={onFormChange}
                    />
                </div>
                <div className="col-sm-12 col-md-12 col-lg-12 ">
                    <TextareaControl
                        label="Post Description"
                        placeholder="Enter your post description"
                        name="description"
                        value={info.description}
                        changeHandler={onFormChange}
                    />
                </div>
                <div className="col-sm-12 col-md-12 col-lg-12 ">
                    <SelectControl
                        label="Post Status"
                        name="is_active"
                        options={options}
                        changeHandler={onFormChange}
                    />
                </div>
                <div className="col-sm-12 col-md-12 col-lg-12 ">
                    <button className="btn btn-primary btn-sm float-end mt-2" onClick={onFinish}>{isSending ? 'Sending Post...' : 'Save Post'}</button>
                    <button hidden={!errorMessage} className="btn btn-danger">{errorMessage}</button>
                </div>
            </div>
        </div>
    );
};

export default AddNewPostForm;

// data-bs-dismiss="modal"