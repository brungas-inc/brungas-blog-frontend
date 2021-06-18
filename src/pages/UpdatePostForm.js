import React from 'react';
import InputControl from "../controls/InputControl";
import TextareaControl from "../controls/TextareaControl";
import SelectControl from "../controls/SelectControl";

const options = [
    {id: 1, title: "Private"},
    {id: 2, title: "Public"},
];

const UpdatePostForm = () => {
    return (
        <div className="row p-lg-3 justify-content-center">
            <div className="container-fluid">
                <div className="col-sm-12 col-md-12 col-lg-12 ">
                    <InputControl
                        label="Post Title"
                        placeholder="Enter your post title"
                        name="text"
                        required={true}
                    />
                </div>
                <div className="col-sm-12 col-md-12 col-lg-12 ">
                    <TextareaControl
                        label="Post Description"
                        placeholder="Enter your post description"
                        name="text"
                        required={true}
                    />
                </div>
                <div className="col-sm-12 col-md-12 col-lg-12 ">
                    <SelectControl
                        label="Post Status"
                        name="post_status"
                        options={options}
                        required={true}
                    />
                </div>
                <div className="col-sm-12 col-md-12 col-lg-12 ">
                    <button data-bs-dismiss="modal" className="btn btn-primary btn-sm float-end mt-2">Update Post</button>
                </div>
            </div>
        </div>
    );
};

export default UpdatePostForm;