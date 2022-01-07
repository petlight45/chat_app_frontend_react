import axiosInstance from "../../config/api/axios";

export const fetchFaceBookPagePostComments = async (page_id, post_id) => {
    const apiEndpoint = `/user/facebook/post/comments/${page_id}/${post_id}/`
    try {
        let response = await axiosInstance().get(apiEndpoint)
        console.log(response.status)
        return [true, response.data]
    }catch{
        return [false, null]
    }
}


