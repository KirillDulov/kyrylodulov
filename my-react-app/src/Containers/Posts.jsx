import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts } from "../slices/postsSlice";

const Posts = () => {
    const dispatch = useDispatch();

    const posts = useSelector((state) => state.posts.items);
    const loading = useSelector((state) => state.posts.loading);
    const error = useSelector((state) => state.posts.error);


    useEffect(() => {
        dispatch(fetchPosts());
    }, [dispatch]);

    if (loading) return <p>Завантаження...</p>;
    if (error) return <p>Помилка: {error}</p>;

    return (
        <>
            <h1>Posts</h1>
            <ul>
                {posts.map(post => (
                    <li key={post.id}>
                        <Link to={`/post/${post.id}`}>{post.title}</Link>
                    </li>
                ))}
            </ul>
        </>
    );
};

export default Posts;