import { createBrowserRouter, RouterProvider } from "react-router-dom";
import NotFoundPage from "@/pages/NotFoundPage";
import AuthPage from "@/pages/AuthPage";
import PageLayout from "@/components/PageLayout";
import IssuePage from "@/pages/IssuePage";
import TaskPage from "@/pages/TaskPage";
import ProfilePage from "@/pages/ProfilePage";

const router = createBrowserRouter([
  {
    path: "/auth",
    element: <AuthPage />,
    errorElement: <NotFoundPage />,
  },
  {
    path: "/",
    element: <PageLayout />,
    errorElement: <NotFoundPage />,
    children: [
      {
        index: true,
        element: <IssuePage />,
      },
      {
        path: "/tasks",
        element: <TaskPage />,
      },
      {
        path: "/mypage",
        element: <ProfilePage />,
      },
    ],
  },
]);


const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
