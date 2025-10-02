import { use } from "react";

const postsPromise = fetch("https://jsonplaceholder.typicode.com/posts")
    .then((res) => {
        if (!res.ok) throw new Error("Помилка завантаження постів");
        return res.json();
    });

export default function Posts() {
    const posts = use(postsPromise);

    return (
        <div>
            <h2>Пости</h2>
            <ul>
                {posts.slice(0, 5).map((post) => (
                    <li key={post.id}>
                        <strong>{post.title}</strong>
                        <p>{post.body}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}