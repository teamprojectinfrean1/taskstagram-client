import { RecoilRoot } from "recoil";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import AuthMain from "./pages/AuthMain";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const queryClient = new QueryClient();

const App = () => {

  const [logged, setLogged] = useState(true);
  return (
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        <Router>
          <Routes>
            {logged ? (
              <Route path="/" element={<AuthMain formType="login" />}></Route>
            ) : (
              <></>
            )}
            <Route
              path="/login"
              element={<AuthMain formType="login" />}
            ></Route>
            <Route
              path="/signup"
              element={<AuthMain formType="signup" />}
            ></Route>
            <Route
              path="/find/username"
              element={<AuthMain formType="find-username" />}
            ></Route>
            <Route
              path="/find/password"
              element={<AuthMain formType="find-password" />}
            ></Route>
          </Routes>
        </Router>
      </QueryClientProvider>
    </RecoilRoot>
  );
};

export default App;
