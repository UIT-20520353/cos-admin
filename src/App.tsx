import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import Login from "~/pages/Login";
import MainPage from "~/pages/MainPage";
import "./App.css";
import Dashboard from "~/pages/Dashboard";
import ManageAccount from "~/pages/Account/ManageAccount";
import ManageHost from "~/pages/Host/ManageHost";
import ManageProblem from "~/pages/Problem/ManageProblem";
import DetailProblem from "~/pages/Problem/DetailProblem";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import React, { useEffect, useState } from "react";
import { ISimpleAccount } from "~/types/account.type";

function App() {
  const navigate = useNavigate();
  const [auth, setAuth] = useState<ISimpleAccount | null>(null);

  useEffect(() => {
    if (sessionStorage.getItem("id")) {
      const temp: ISimpleAccount = {
        id: Number(sessionStorage.getItem("id")),
        name: sessionStorage.getItem("name")
      };
      setAuth(temp);
    }
  }, []);

  const handleSetAuth = (id: number, name: string): void => {
    const temp: ISimpleAccount = { id, name };
    setAuth(temp);
  };
  const handleLogout = (): void => {
    setAuth(null);
    sessionStorage.clear();
    navigate("/", { replace: true });
  };

  return (
    <div className="w-full">
      <Routes>
        <Route
          path={"/"}
          element={
            auth ? <MainPage auth={auth} handleLogout={handleLogout} /> : <Login handleSetAuth={handleSetAuth} />
          }
        >
          <Route index={true} element={<Dashboard />} />
          <Route path={"manage-account"} element={<ManageAccount />} />
          <Route path={"manage-host"} element={<ManageHost />} />
          <Route path={"manage-problem"} element={<ManageProblem />} />
          <Route path={"problem/detail/:id"} element={<DetailProblem />} />
        </Route>
        {/*<Route path={"/login"} element={<Login handleSetAuth={handleSetAuth} />} />*/}
      </Routes>
      <ToastContainer pauseOnFocusLoss={false} pauseOnHover={false} closeOnClick={false} draggable={false} />
    </div>
  );
}

export default App;
