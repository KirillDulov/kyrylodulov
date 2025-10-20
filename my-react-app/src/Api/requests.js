import axios from 'axios';
import { BASE_URL, POSTS} from './endpoints';

export async function getPosts() {
    const posts = await axios.get(`${BASE_URL}${POSTS}`);
    return posts.data;
}

export async function getPost(postID) {
    const post = await axios.get(`${BASE_URL}${POSTS}/${postID}`);
    return post.data;
}

