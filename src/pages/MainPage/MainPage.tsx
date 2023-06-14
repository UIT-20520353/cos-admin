import { Outlet } from "react-router-dom";
import SideBar from "~/components/SideBar";

function MainPage() {
  return (
    <div className={"flex w-full flex-row"}>
      <SideBar />
      <div className={"flex-1 bg-[#fff]"}>
        <Outlet />
      </div>
    </div>
  );
}

export default MainPage;
