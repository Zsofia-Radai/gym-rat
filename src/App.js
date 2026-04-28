import { createBrowserRouter, RouterProvider } from "react-router-dom";
import GymRat from "./GymRat";
import TemplateDetails from "./components/TemplateDetails/TemplateDetails";
import ErrorPage from "./ErrorPage";
import { useState } from "react";
import EditTemplate from "./components/EditTemplate/EditTemplate";

function App() {
  const [templates, setTemplates] = useState(() => {
    const storedTemplates = JSON.parse(localStorage.getItem("templates"));
    return storedTemplates || [];
  });

  const router = createBrowserRouter([
    {
      path: "/",
      element: <GymRat templates={templates} setTemplates={setTemplates} />,
      errorElement: <ErrorPage />,
    },
    {
      path: "/template/:id",
      element: <TemplateDetails templates={templates} />,
      errorElement: <ErrorPage />,
    },
    {
      path: "/template/:id/edit",
      element: (
        <EditTemplate templates={templates} setTemplates={setTemplates} />
      ),
      errorElement: <ErrorPage />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
