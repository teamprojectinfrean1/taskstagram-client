import "@/App.css";
import { useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import NotFoundPage from "@/pages/NotFoundPage";
import AuthPage from "./pages/AuthPage";
import PageLayout from "@/components/PageLayout";
import IssuePage from "@/pages/IssuePage";
import TaskPage from "@/pages/TaskPage";
import ProfilePage from "@/pages/ProfilePage";
import { loggedState } from "./Store";
import { useRecoilValue } from "recoil";

const router = createBrowserRouter([
  {
    path: "/auth",
    errorElement: <NotFoundPage />,
    children: [
      {
        index: true,
        element: <AuthPage formType="login" />,
      },
      {
        path: "signup",
        element: <AuthPage formType="signup" />,
      },
      {
        path: "find/email",
        element: <AuthPage formType="find-email" />,
      },
      {
        path: "find/password",
        element: <AuthPage formType="find-password" />,
      },
      {
        path: "signup/success",
        element: <AuthPage formType="signup-success" />,
      },
    ],
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

  const logged = useRecoilValue(loggedState);

  useEffect(() => {
    logged? router.navigate("/") : router.navigate("/auth")
  }, [logged])

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default App;
