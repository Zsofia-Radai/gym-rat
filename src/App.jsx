import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Templates from "./features/templates/Templates";
import TemplateDetails from "./features/templates/TemplateDetails/TemplateDetails";
import { useState } from "react";
import EditTemplate from "./features/templates/EditTemplate/EditTemplate";
import GymSession from "./features/sessions/GymSession/GymSession";
import GymSessions from "./features/sessions/GymSessions/GymSessions";
import ErrorPage from "./app/ErrorPage";
import AppLayout from "./layout/AppLayout";
import { TemplatesProvider } from "./context/TemplatesContext";

function App() {
  const [templates, setTemplates] = useState(() => {
    const storedTemplates = JSON.parse(localStorage.getItem("templates"));
    return storedTemplates || [];
  });

  const [sessions, setSessions] = useState(() => {
    const storedSessions = JSON.parse(localStorage.getItem("sessions"));
    return storedSessions || [];
  });

  const router = createBrowserRouter([
    {
      path: "/",
      element: <AppLayout />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: "/",
          element: (
            <Templates />
          ),
        },
        {
          path: "/workout/sessions",
          element: (
            <GymSessions sessions={sessions} setSessions={setSessions} />
          ),
        },
      ],
    },

    {
      path: "/template/:id",
      element: (
        <TemplateDetails
          setSessions={setSessions}
          sessions={sessions}
        />
      ),
      errorElement: <ErrorPage />,
    },
    {
      path: "/workout/session/:sessionId",
      element: <GymSession sessions={sessions} setSessions={setSessions} />,
      errorElement: <ErrorPage />,
    },
    {
      path: "/template/:id/edit",
      element: (
        <EditTemplate />
      ),
      errorElement: <ErrorPage />,
    },
  ]);

  return (
    <TemplatesProvider>
      <RouterProvider router={router} />
    </TemplatesProvider>
  )
}

export default App;
