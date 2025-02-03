import { createBrowserRouter, RouterProvider } from "react-router";

import "swiper/swiper-bundle.css";

import LoginPage from "./pages/LoginPage";
import Home from "./pages/Home";
import ProtectedRoutes from "./routes/ProtectedRoutes";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/",
    element: (
      <ProtectedRoutes>
        <Home />
      </ProtectedRoutes>
    ),
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
