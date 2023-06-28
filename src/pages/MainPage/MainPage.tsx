import { Outlet } from "react-router-dom";
import SideBar from "~/components/SideBar";

interface MainPageProps {
  handleLogout: () => void;
}

function MainPage(props: MainPageProps) {
  return (
    <div className={"flex w-full flex-row"}>
      <SideBar handleLogout={props.handleLogout} />
      <div className={"flex-1 bg-[#fff]"}>
        <Outlet />
      </div>
    </div>
  );
}

export default MainPage;
