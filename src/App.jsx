import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Templates from "./features/templates/Templates";
import TemplateDetails from "./features/templates/TemplateDetails/TemplateDetails";
import { useEffect, useState } from "react";
import EditTemplate from "./features/templates/EditTemplate/EditTemplate";
import GymSession from "./features/sessions/GymSession/GymSession";
import GymSessions from "./features/sessions/GymSessions/GymSessions";
import ErrorPage from "./app/ErrorPage";
import AppLayout from "./layout/AppLayout";
import { TemplatesProvider } from "./context/TemplatesContext";
import ToastNotification from "./components/ui/ToastNotification/ToastNotification";

export const TOAST_TYPE = {
  SAVE: "save",
  DELETE: "delete",
};

function App() {
  const [toast, setToast] = useState();
  const [sessions, setSessions] = useState(() => {
    const storedSessions = JSON.parse(localStorage.getItem("sessions"));
    return storedSessions || [];
  });

  useEffect(() => {
    localStorage.setItem("sessions", JSON.stringify(sessions));
  }, [sessions]);

  const showToast = (message, type = TOAST_TYPE.SAVE) => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 1500);
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: <AppLayout />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: "/",
          element: <Templates showToast={showToast} />,
        },
        {
          path: "/workout/sessions",
          element: (
            <GymSessions
              sessions={sessions}
              setSessions={setSessions}
              showToast={showToast}
            />
          ),
        },
      ],
    },

    {
      path: "/template/:id",
      element: (
        <TemplateDetails setSessions={setSessions} sessions={sessions} />
      ),
      errorElement: <ErrorPage />,
    },
    {
      path: "/workout/session/:sessionId",
      element: (
        <GymSession
          sessions={sessions}
          setSessions={setSessions}
          showToast={showToast}
        />
      ),
      errorElement: <ErrorPage />,
    },
    {
      path: "/template/:id/edit",
      element: <EditTemplate />,
      errorElement: <ErrorPage />,
    },
  ]);

  return (
    <TemplatesProvider>
      {toast && <ToastNotification type={toast.type} message={toast.message} />}
      <RouterProvider router={router} />
    </TemplatesProvider>
  );
}

export default App;
