import "@/App.css";
import { useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import NotFoundPage from "@/pages/NotFoundPage";
import AuthPage from "./pages/AuthPage";
import PageLayout from "@/components/PageLayout";
import IssuePage from "@/pages/IssuePage";
import TaskPage from "@/pages/TaskPage";
import ProfilePage from "@/pages/ProfilePage";
import { loggedState } from "./stores/Store";
import { useRecoilValue } from "recoil";

const router = createBrowserRouter([
  {
    path: "/auth/login", 
    element: <AuthPage formType="login" />,
  },
  {
    path: "/auth/signup",
    element: <AuthPage formType="signup" />,
  },
  {
    path: "/auth/find/email",
    element: <AuthPage formType="find-email" />,
  },
  {
    path: "/auth/find/password",
    element: <AuthPage formType="find-password" />,
  },
  {
    path: "/auth/signup/success",
    element: <AuthPage formType="signup-success" />,
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

  // 로그인 유무
  // useEffect(() => {
  //   logged? router.navigate("/") : router.navigate("/auth/login")
  // }, [logged])

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default App;
