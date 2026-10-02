import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../layouts/RootLayout.jsx";
import Home from "../pages/Home.jsx";
import About from "../pages/About.jsx";
import Services from "../pages/Services.jsx";
import Contact from "../pages/Contact.jsx";
import ProtectedRoute from "../layouts/ProtectedRoute.jsx";
import { Dasbhaord } from "../pages/Dasbhaord.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "about", element: <About /> },
      { path: "services", element: <Services /> },
      { path: "contact", element: <Contact /> },
      { path: "*", element: <Home /> },

      {
        element: <ProtectedRoute />,
        children: [
          {
            path: "dashboard",
            element: <Dasbhaord />,
          },
        ],
      },
    ],
  },
]);

export default router;
