import "@/App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import NotFoundPage from "@/pages/NotFoundPage";
import AuthPage from "@/pages/AuthPage";
import PageLayout from "@/components/PageLayout";
import IssuePage from "@/pages/IssuePage";
import TaskPage from "@/pages/TaskPage";
import ProfilePage from "@/pages/ProfilePage";
import FindIdForm from "@/components/auth/FindIdForm";
import LoginForm from "@/components/auth/LoginForm";
import FindIdLayout from "@/components/auth/FindIdLayout";
import FindIdSuccess from "@/components/auth/FindIdSuccess";
import FindPasswdLayout from "@/components/auth/FindPasswordLayout";
import FindPasswordForm from "@/components/auth/FindPasswordForm";
import FindPasswdSuccess from "@/components/auth/ResetPassword";
import SignupSuccess from "@/components/auth/SignupSuccess";
import SignupFormRequired from "@/components/auth/SignupFormRequired";
import SignupFormOptional from "@/components/auth/SignupFormOptional";
import ProjectPage from "./pages/ProjectPage";
import ProtectedRouter from "./components/ProtectedRouter";

const router = createBrowserRouter([
  {
    path: "/auth",
    element: <AuthPage />,
    children: [
      {
        path: "login",
        element: <LoginForm />,
      },
      {
        path: "signup/required",
        element: <SignupFormRequired />,
      },
      {
        path: "signup/optional",
        element: <SignupFormOptional />,
      },
      {
        path: "signup/success",
        element: <SignupSuccess />,
      },
      {
        path: "find/id",
        element: <FindIdLayout />,
        children: [
          {
            index: true,
            element: <FindIdForm />,
          },
          {
            path: "success",
            element: <FindIdSuccess />,
          },
        ],
      },
      {
        path: "find/password",
        element: <FindPasswdLayout />,
        children: [
          {
            index: true,
            element: <FindPasswordForm />,
          },
          {
            path: "reset",
            element: <FindPasswdSuccess />,
          },
        ],
      },
    ],
  },
  {
    path: "/",
    element: (
      <ProtectedRouter>
        <PageLayout />
      </ProtectedRouter>
    ),
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
      {
        path: "/project",
        element: <ProjectPage />,
      },
    ],
  },
]);

const App = () => {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default App;
