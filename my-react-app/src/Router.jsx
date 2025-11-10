import { createBrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import Home from "./Components/Pages/Home.jsx";
import About from "./Components/Pages/About.jsx";
import Contact from "./Components/Pages/Contact.jsx";
import Post from './Containers/Post.jsx';
import Posts from './Containers/Posts.jsx';
import Form from "./Components/Pages/Form.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,

    children: [
      { path: "/", element: <Home /> },             
      { path: "about", element: <About /> },       
      { path: "contact", element: <Contact /> },
      { path: "form", element: <Form /> },
      { path: "posts", element: <Posts /> },
      { path: "post/:id", element: <Post /> },     
    ],
  },
]);

export default router;
