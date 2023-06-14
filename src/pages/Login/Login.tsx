import { useDispatch, useSelector } from "react-redux";
import { userLogin } from "~/pages/Login/login.reducer";
import { getAccountById, handleLogin } from "~/queries/api/account-service";
import { SubmitHandler, useForm } from "react-hook-form";
import { ILoginForm } from "~/types/form.type";
import CryptoJS from "crypto-js";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { RootState } from "~/store/store";

const MyAlert = withReactContent(Swal);

function Login() {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<ILoginForm>();

  const onSubmit: SubmitHandler<ILoginForm> = async (data) => {
    MyAlert.fire({
      allowOutsideClick: false,
      title: "Đang xử lý",
      position: "center",
      didOpen() {
        MyAlert.showLoading();
      },
      didClose() {
        if (sessionStorage.getItem("id"))
          MyAlert.fire({
            position: "center",
            titleText: "Đăng nhập thành công",
            icon: "success",
            showConfirmButton: true,
            confirmButtonText: "Xác nhận",
            timer: 3000
          });
        else
          MyAlert.fire({
            position: "center",
            titleText: "Tên đăng nhập hoặc mật khẩu không chính xác",
            icon: "error",
            toast: true,
            showConfirmButton: true,
            confirmButtonText: "Xác nhận",
            allowOutsideClick: false,
            timer: 3000
          });
      }
    });

    const hashPassword = CryptoJS.SHA256(data.password).toString();
    const result = await handleLogin(data.username, hashPassword);

    if (result) {
      const account = await getAccountById(result);
      if (account && account.length !== 0) {
        dispatch(userLogin({ id: result, name: account[0].name }));
        sessionStorage.setItem("id", result.toString());
        sessionStorage.setItem("name", account[0].name);
      }
    }

    MyAlert.close();
  };

  return (
    <div className={"flex h-screen w-full items-center justify-center bg-gray-100"}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={"grid w-1/2 grid-rows-4 gap-3 rounded-md bg-gray-200 p-3 pb-1 shadow-md"}
      >
        <div className={"flex items-center justify-center"}>
          <p className={"text-3xl font-semibold"}>Đăng nhập</p>
        </div>
        <div className={"relative mb-4"}>
          <span className={"mb-2 block text-sm font-semibold text-gray-900"}>Tên đăng nhập</span>
          <input
            id={"user-name"}
            className={
              "block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
            }
            type="text"
            autoComplete={"off"}
            {...register("username", { required: "Vui lòng nhập tên đăng nhập" })}
          />
          {errors.username && <span className={"absolute mt-1 text-xs text-red-600"}>{errors.username.message}</span>}
        </div>
        <div className={"relative"}>
          <span className={"mb-2 block text-sm font-semibold text-gray-900"}>Mật khẩu</span>
          <input
            id={"password"}
            className={
              "block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
            }
            type="password"
            autoComplete={"off"}
            {...register("password", { required: "Vui lòng nhập mật khẩu" })}
          />
          {errors.password && <span className={"absolute mt-1 text-xs text-red-600"}>{errors.password.message}</span>}
        </div>
        <div className={"flex flex-col items-start mt-3"}>
          <button
            className={"w-full rounded-lg bg-[#0077b6] py-2 text-gray-100 hover:bg-[#0096c7] hover:text-white"}
            type={"submit"}
          >
            Đăng nhập
          </button>
        </div>
      </form>
    </div>
  );
}

export default Login;
