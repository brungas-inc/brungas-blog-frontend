import baseLink from './base'
// import axios from 'axios';


// User APIs
export async function createUserAccount(payload) {
    const response = await baseLink.post("users/register/", payload )
    return response.data
}

export async function loginUser(payload) {
    const response = await baseLink.post("users/login/", payload)
    return response.data
}

export async function getUserInfo(config) {
    const response = await baseLink.get("user/profile/", config)
    return response.data
}

export async function editUserInfo(payload, config) {
    const response = await baseLink.put(`users/${payload.id}/`, payload, config)
    return response.data
}

export async function changeUserPassword(payload, config) {
    const response = await baseLink.put(`change_password/${payload.id}/`, payload, config)
    return response.data
}

export async function getPostsByUserId(userId, config) {
    const response = await baseLink.get(`post/user/${userId}/posts/`, config)
    return response.data
}

export async function getCommentsByPostId(postId, config) {
    const response = await baseLink.get(`post/${postId}/comments/`, config)
    return response.data
}

export async function addPost(payload, config) {
    const response = await baseLink.post('all_posts/', payload, config)
    return response.data
}

export async function deletePost(postId, config) {
    const response = await baseLink.delete(`all_posts/${postId}/`, config)
    return response.data
}

export async function editPost(payload, config) {
    const response = await baseLink.put(`all_posts/${payload.id}/`, payload, config)
    return response.data
}

// export async function logoutUser(config) {
//     const response = await baseLink.post("logout/", config)
//     return response
// }

// Posts APIs
export async function fetchAllPosts() {
    const response = await baseLink.get("all_posts/")
    return response.data
}

export async function fetchAllLikes() {
    const response = await baseLink.get("all_likes/")
    return response.data
}

export async function fetchAllComments() {
    const response = await baseLink.get("all_comments/")
    return response.data
}

export async function addLike(payload, config) {
    const response = await baseLink.post("all_likes/", payload, config)
    return response.data
}

export async function deleteLike(likeId) {
    const response = await baseLink.delete(`all_likes/${likeId}/`)
    return response.data
}

export async function fetchLikesByPostId(postId) {
    const response = await baseLink.get(`post/${postId}/likes/`)
    return response.data
}

export async function getSinglePostById(id) {
    const response = await baseLink.get(`all_posts/${id}/`)
    return response.data
}

// export async function fetchUserPosts(config) {
//     const response = await baseLink.get("user/posts/", config)
//     return response.data
// }

// export async function createPost(payload, config) {
//     const response = await baseLink.post("posts/", payload)
//     return response.data
// }

// export async function updatePost(postId, payload, config) {
//     const response = await baseLink.put(`posts/${postId}/`, payload)
//     return response.data
// }

// export async function getSinglePost(postId, config) {
//     const response = await baseLink.get(`posts/${postId}`)
//     return response.data
// }

// export async function deleteSinglePost(id, config) {
//     const response = await baseLink.delete(`posts/${id}/`)
//     return response.data
// }

// // Notifications APIs
// export async function fetchAllNotifications() {
//     const response = await baseLink.get("notifications/")
//     return response.data
// }

// export async function fetchUserNotifications(config) {
//     const response = await baseLink.get("user/notifications/", config)
//     return response.data
// }

// export async function deleteSingleNotification(id, config) {
//     const response = await baseLink.delete(`notifications/${id}/`)
//     return response.data
// }

// export async function createNotification(payload, config) {
//     const response = await baseLink.post("notifications/", payload )
//     return response.data
// }

// // For Post Votes
// export async function fetchAllVotes() {
//     const response = await baseLink.get("postVotes/")
//     return response.data
// }
// // export async function editUser(id, payload) {
// //     const response = await baseLink.put(`users/update/${id}`, payload)
// //     return response
// // }

// // export async function deleteMultpleTodos(payloasds) {
// //     const requests = payloasds.map((todo) => baseLink.delete(`todos/delete/${todo}`))
// //     const responseArray = await axios.all([...requests])
// //     return responseArray
// // }
