import logo from "~/assets/transparent-logo.svg";
import { NavLink, useNavigate } from "react-router-dom";
import { RxDashboard } from "react-icons/rx";
import { MdContentPaste, MdOutlineSupervisorAccount } from "react-icons/md";
import { IoIosLogOut } from "react-icons/io";
import { GrOrganization } from "react-icons/gr";

const icons = [RxDashboard, MdOutlineSupervisorAccount, GrOrganization, MdContentPaste];

interface SidebarProps {
  handleLogout: () => void;
}

function SideBar(props: SidebarProps) {
  // const navigate = useNavigate();

  const menus: { id: number; title: string; address: string }[] = [
    {
      id: 1,
      title: "Trang chủ",
      address: "/"
    },
    {
      id: 2,
      title: "Quản lý tài khoản",
      address: "/manage-account"
    },
    {
      id: 3,
      title: "Quản lý ban tổ chức",
      address: "/manage-host"
    },
    {
      id: 4,
      title: "Quản lý bài tập",
      address: "/manage-problem"
    }
  ];
  // const handleLogout = () => {
  //   sessionStorage.removeItem("id");
  //   sessionStorage.removeItem("name");
  //   navigate("/login", { replace: true });
  // };

  return (
    <div className={"flex min-h-screen w-80 min-w-20 flex-col items-center bg-[#EAEAEA] shadow-2xl duration-300"}>
      <div className={"sticky top-0 flex w-full cursor-pointer flex-col items-center py-11"}>
        <img src={logo} alt="Logo web" className={"w-48 duration-300"} />
      </div>

      <div className={`sticky top-[180px] flex w-full flex-col items-center gap-y-2`}>
        {menus.map((item) => {
          const Icon = icons[item.id - 1];
          return (
            <NavLink
              className={({ isActive }) =>
                `mt-2 flex w-4/5 cursor-pointer duration-200 flex-row items-center gap-x-2 rounded-lg p-2 text-lg hover:bg-[#fff] hover:shadow-md ${
                  isActive ? "bg-[#fff] shadow-md" : "bg-[#EAEAEA]"
                }`
              }
              key={item.id}
              to={item.address}
            >
              <Icon className={`mx-3 inline-block h-6 w-6`} />
              <span className={`origin-left duration-200 truncate`}>{item.title}</span>
            </NavLink>
          );
        })}
        <button
          className={
            "mt-2 flex w-4/5 cursor-pointer flex-row items-center gap-x-2 rounded-lg bg-[#EAEAEA] p-2 text-lg hover:bg-[#fff] hover:shadow-md"
          }
          onClick={props.handleLogout}
        >
          <IoIosLogOut className={`mx-3 inline-block h-6 w-6`} />
          <span className={`origin-left duration-200 truncate`}>Đăng xuất</span>
        </button>
      </div>
    </div>
  );
}

export default SideBar;
