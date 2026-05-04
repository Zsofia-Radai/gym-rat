import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Templates from "./features/templates/Templates";
import TemplateDetails from "./features/templates/TemplateDetails/TemplateDetails";
import { useState } from "react";
import EditTemplate from "./features/templates/EditTemplate/EditTemplate";
import GymSession from "./features/sessions/GymSession/GymSession";
import GymSessions from "./features/sessions/GymSessions/GymSessions";
import ErrorPage from "./app/ErrorPage";

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
      element: <Templates templates={templates} setTemplates={setTemplates} />,
      errorElement: <ErrorPage />,
    },
    {
      path: "/template/:id",
      element: (
        <TemplateDetails
          templates={templates}
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
      path: "/workout/sessions",
      element: <GymSessions sessions={sessions} setSessions={setSessions} />,
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
