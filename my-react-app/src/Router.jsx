import { createBrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import Home from "./Components/Pages/Home.jsx";
import About from "./Components/Pages/About.jsx";
import Contact from "./Components/Pages/Contact.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,

    children: [
      { path: "/", element: <Home /> },
      { path: "/about", element: <About /> },
      { path: "/contact", element: <Contact /> },
    ],
  },
]);

export default router;
