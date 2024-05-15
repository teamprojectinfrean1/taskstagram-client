import "@/App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import NotFoundPage from "@/pages/NotFoundPage";
import AuthPage from "@/pages/AuthPage";
import PageLayout from "@/components/PageLayout";
import IssuePage from "@/pages/IssuePage";
import TaskPage from "@/pages/TaskPage";
import FindIdForm from "@/components/Auth/FindIdForm";
import LoginForm from "@/components/Auth/LoginForm";
import FindIdLayout from "@/components/Auth/FindIdLayout";
import FindIdSuccess from "@/components/Auth/FindIdSuccess";
import FindPasswdLayout from "@/components/Auth/FindPasswordLayout";
import FindPasswordForm from "@/components/Auth/FindPasswordForm";
import SignupSuccess from "@/components/Auth/SignupSuccess";
import SignupFormRequired from "@/components/Auth/SignupFormRequired";
import SignupFormOptional from "@/components/Auth/SignupFormOptional";
import ProjectPage from "./pages/ProjectPage";
import ProtectedRouter from "./components/ProtectedRouter";
import ResetPasswordForm from "@/components/Auth/ResetPasswordForm";
import FindPasswordSuccess from "./components/Auth/FindPasswordSuccess";
import RedirectPage from "./components/OAuth/RedirectPage";
import MyPage from "./pages/MyPage";
import UserProfileLayout from "./components/MyPage/UserProfileLayout";
import ChangeNickname from "./components/MyPage/ChangeNickname";
import ChangePassword from "./components/MyPage/ChangePassword";
import ChangeUserInfoSuccess from "./components/MyPage/ChangeUserInfoSuccess";
import ChangeEmail from "./components/MyPage/ChangeEmail";

const router = createBrowserRouter([
  {
    path: "/oauth/redirected/kakao",
    element: <RedirectPage />,
  },
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
            element: <ResetPasswordForm />,
          },
          {
            path: "success",
            element: <FindPasswordSuccess />,
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
        element: <MyPage />,
        children: [
          {
            index: true,
            element: <UserProfileLayout />,
          },
          {
            path: "change/nickname",
            element: <ChangeNickname />,
          },
          {
            path: "change/password",
            element: <ChangePassword />,
          },
          {
            path: "change/email",
            element: <ChangeEmail />,
          },
          {
            path: "change/success",
            element: <ChangeUserInfoSuccess />,
          },
        ],
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
