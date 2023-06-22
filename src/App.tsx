import { Route, Routes } from "react-router-dom";
import Login from "~/pages/Login";
import MainPage from "~/pages/MainPage";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "~/store/store";
import { useEffect } from "react";
import { userLogin } from "~/pages/Login/login.reducer";
import "./App.css";
import Dashboard from "~/pages/Dashboard";
import ManageAccount from "~/pages/Account/ManageAccount";
import ManageHost from "~/pages/Host/ManageHost";
import ManageProblem from "~/pages/Problem/ManageProblem";
import DetailProblem from "~/pages/Problem/DetailProblem";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const user = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (sessionStorage.getItem("id") !== "-1") {
      dispatch(
        userLogin({ id: parseInt(sessionStorage.getItem("id") ?? "-1"), name: sessionStorage.getItem("name") ?? "" })
      );
    }
  }, []);

  return (
    <div className="w-full">
      <Routes>
        <Route path={"/"} element={user.id !== -1 ? <MainPage /> : <Login />}>
          <Route index={true} element={<Dashboard />} />
          <Route path={"manage-account"} element={<ManageAccount />} />
          <Route path={"manage-host"} element={<ManageHost />} />
          <Route path={"manage-problem"} element={<ManageProblem />} />
          <Route path={"problem/detail/:id"} element={<DetailProblem />} />
        </Route>
      </Routes>
      <ToastContainer pauseOnFocusLoss={false} pauseOnHover={false} closeOnClick={false} draggable={false} />
    </div>
  );
}

export default App;
