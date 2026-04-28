import { createBrowserRouter, RouterProvider } from "react-router-dom";
import GymRat from "./GymRat";

const router = createBrowserRouter([{ path: "/", element: <GymRat /> }]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
