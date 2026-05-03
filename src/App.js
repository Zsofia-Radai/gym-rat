import { createBrowserRouter, RouterProvider } from "react-router-dom";
import GymRat from "./GymRat";
import TemplateDetails from "./components/TemplateDetails/TemplateDetails";
import ErrorPage from "./ErrorPage";
import { useState } from "react";
import EditTemplate from "./components/EditTemplate/EditTemplate";
import GymSession from "./components/GymSession/GymSession";
import WorkoutSessions from "./components/WorkoutSessions/WorkoutSessions";

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
      element: <GymRat templates={templates} setTemplates={setTemplates} />,
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
      element: (
        <WorkoutSessions sessions={sessions} setSessions={setSessions} />
      ),
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
