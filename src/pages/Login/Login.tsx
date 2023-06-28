import { handleLogin } from "~/queries/api/account-service";
import { SubmitHandler, useForm } from "react-hook-form";
import { ILoginForm } from "~/types/form.type";
import CryptoJS from "crypto-js";
import { toast } from "react-toastify";
import LoadingModal from "~/components/Modal/LoadingModal";
import { useMutation } from "@tanstack/react-query";
import { ISimpleAccount } from "~/types/account.type";

interface LoginProps {
  handleSetAuth: (id: number, name: string) => void;
}

function Login(props: LoginProps) {
  const { register, handleSubmit } = useForm<ILoginForm>();

  const { mutate: login, isLoading } = useMutation({
    mutationFn: (body: ILoginForm) => {
      const hashPassword = CryptoJS.SHA256(body.password).toString();
      return handleLogin(body.username, hashPassword);
    },
    onSuccess: (data: ISimpleAccount) => {
      if (data.id === -1) {
        toast("Tên đăng nhập hoặc mật khẩu không chính xác", {
          position: "bottom-right",
          autoClose: 3000,
          closeOnClick: false,
          type: "error"
        });
        return;
      }
      props.handleSetAuth(data.id, data.name);
      sessionStorage.setItem("id", data.id.toString());
      sessionStorage.setItem("name", data.name);
      toast("Đăng nhập thành công", {
        position: "bottom-right",
        autoClose: 3000,
        closeOnClick: false,
        type: "success"
      });
    }
  });

  const onSubmit: SubmitHandler<ILoginForm> = async (data) => {
    if (!data.username) {
      toast("Vui lòng nhập tên đăng nhập", {
        position: "bottom-right",
        autoClose: 3000,
        closeOnClick: false,
        type: "warning"
      });
      return;
    }
    if (!data.password) {
      toast("Vui lòng nhập mật khẩu", {
        position: "bottom-right",
        autoClose: 3000,
        closeOnClick: false,
        type: "warning"
      });
      return;
    }

    login(data);

    // if (sessionStorage.getItem("id") != null)
    // else
  };

  return (
    <div className={"flex h-screen w-full items-center justify-center bg-gray-100"}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={"w-1/2 rounded-md bg-[#4F5169] text-center text-[#222E3D] px-8 pt-7 pb-5 shadow-md"}
      >
        <p className={"text-2xl font-semibold text-white"}>Đăng nhập</p>
        <div
          className={
            "relative mt-4 py-2 px-4 flex flex-row justify-center items-center gap-x-2 bg-[#1f2029] rounded-md"
          }
        >
          <svg className={"fill-[#ffeba7] w-5 h-5"} viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
            <path d="M288 320a224 224 0 1 0 448 0 224 224 0 1 0-448 0zm544 608H160a32 32 0 0 1-32-32v-96a160 160 0 0 1 160-160h448a160 160 0 0 1 160 160v96a32 32 0 0 1-32 32z" />
          </svg>
          <input
            id={"user-name"}
            placeholder={"Tên đăng nhập"}
            className={
              "outline-none py-2 border-0 w-full text-[#d3d3d3] bg-transparent focus:placeholder:opacity-0 focus:placeholder:duration-500 focus:placeholder:transition-opacity"
            }
            type="text"
            autoComplete={"off"}
            {...register("username")}
          />
        </div>
        <div
          className={
            "relative mt-4 py-2 px-4 flex flex-row justify-center items-center gap-x-2 bg-[#1f2029] rounded-md"
          }
        >
          <svg className={"fill-[#ffeba7] w-5 h-5"} viewBox="0 0 500 500" xmlns="http://www.w3.org/2000/svg">
            <path d="M80 192V144C80 64.47 144.5 0 224 0C303.5 0 368 64.47 368 144V192H384C419.3 192 448 220.7 448 256V448C448 483.3 419.3 512 384 512H64C28.65 512 0 483.3 0 448V256C0 220.7 28.65 192 64 192H80zM144 192H304V144C304 99.82 268.2 64 224 64C179.8 64 144 99.82 144 144V192z"></path>
          </svg>
          <input
            id={"password"}
            className={
              "outline-none py-2 border-0 w-full text-[#d3d3d3] bg-transparent focus:placeholder:opacity-0 focus:placeholder:duration-500 focus:placeholder:transition-opacity"
            }
            type="password"
            autoComplete={"off"}
            placeholder={"Mật khẩu"}
            {...register("password")}
          />
        </div>
        <div className={"flex flex-col items-start mt-4"}>
          <button
            className={
              "w-full rounded-md bg-[#ffeba7] transition-colors duration-500 py-3 text-[#1f2029] hover:bg-[#1f2029] hover:text-[#ffeba7] font-bold uppercase outline-none"
            }
            type={"submit"}
          >
            Đăng nhập
          </button>
        </div>
      </form>
      {isLoading && <LoadingModal title={"Đang xử lý đăng nhập"} />}
    </div>
  );
}

export default Login;
