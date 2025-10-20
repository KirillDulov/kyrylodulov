import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchPostById } from "../slices/postSlice";

const Post = () => {
  const dispatch = useDispatch();

  const { id } = useParams(); 
  const post = useSelector((state) => state.post.post);
  const loading = useSelector((state) => state.post.loading);
  const error = useSelector((state) => state.post.error);

  useEffect(() => {
   dispatch(fetchPostById(id))
  }, [dispatch, id]);

  if (loading) return <p>Завантаження поста...</p>;
  if (error) return <p>Помилка: {error}</p>;
  if (!post) return null;

  return (
    <>
      <h1>{post.title}</h1>
      <p>{post.body}</p> 
    </>
  );
};

export default Post;