import "@/App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {
  AuthPage,
  IssuePage,
  MyPage,
  NotFoundPage,
  OAuthRedirectPage,
  ProjectPage,
  TaskPage,
} from "@/pages";
import {
  FindIdForm,
  LoginForm,
  FindIdLayout,
  FindIdSuccess,
  FindPasswordLayout,
  FindPasswordForm,
  SignupSuccess,
  SignupFormRequired,
  SignupFormOptional,
  ResetPasswordForm,
  FindPasswordSuccess,
} from "@/components/Auth";
import {
  UserProfileLayout,
  ChangeNickname,
  ChangePassword,
  ChangeUserInfoSuccess,
  ChangeEmail,
} from "@/components/MyPage";
import { PageLayout, ProtectedRouteWrapper } from "@/components";

const router = createBrowserRouter([
  {
    path: "/oauth/redirected/kakao",
    element: <OAuthRedirectPage />,
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
        element: <FindPasswordLayout />,
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
      <ProtectedRouteWrapper>
        <PageLayout />
      </ProtectedRouteWrapper>
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
