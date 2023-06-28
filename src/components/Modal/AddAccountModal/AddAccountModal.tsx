import ModalPortal from "~/components/ModalPortal";
import { SubmitHandler, useForm } from "react-hook-form";
import { IAccountForm } from "~/types/form.type";
import { ChangeEvent, useState } from "react";
import { IHost } from "~/types/host.type";
import Swal from "sweetalert2";
import { checkAccountExist, insertAccount } from "~/queries/api/account-service";
import { isEmailValid, isPhoneNumberValid, isUsernameValid } from "~/utils/ValidateForm";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

type IProps = {
  hosts: IHost[];
  closeModal: () => void;
};

function AddAccountModal(props: IProps) {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<IAccountForm>();
  const [role, setRole] = useState<string>("HOST");
  const { mutateAsync: checkAccount } = useMutation({
    mutationFn: (body: string) => {
      return checkAccountExist(body);
    }
  });
  const { mutate: addAccount } = useMutation({
    mutationFn: (body: IAccountForm) => {
      return insertAccount(body);
    }
  });

  const handleRoleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setRole(event.target.value);
  };

  const onSubmit: SubmitHandler<IAccountForm> = async (data) => {
    const isExist = await checkAccount(data.username);
    if (isExist) {
      toast("Tên đăng nhập đã được sử dụng", {
        type: "error",
        position: "bottom-right",
        autoClose: 3000,
        closeOnClick: false
      });
      return;
    }

    Swal.fire({
      title: "Thông báo",
      text: "Xác nhận tạo tài khoản mới?",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Xác nhận",
      cancelButtonText: "Hủy",
      allowOutsideClick: false
    }).then((result) => {
      if (result.isConfirmed) {
        addAccount(data, {
          onSuccess: (response: boolean) => {
            if (response) {
              toast("Thêm tài khoản thành công", {
                type: "success",
                position: "bottom-right",
                autoClose: 3000,
                closeOnClick: false
              });
              props.closeModal();
            } else {
              toast("Xảy ra lỗi khi thêm tài khoản", {
                type: "error",
                position: "bottom-right",
                autoClose: 3000,
                closeOnClick: false
              });
            }
          }
        });
      }
    });
  };

  return (
    <ModalPortal>
      <div className={"fixed z-30 left-0 top-0 h-screen w-full bg-black opacity-50"}></div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={
          "fixed left-1/2 top-1/2 z-40 max-h-[95%] w-3/5 -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-md bg-white p-5"
        }
      >
        <p className={"mb-4 text-lg font-semibold"}>Tạo tài khoản mới</p>
        <div className={"mb-6 relative"}>
          <span className={"text-sm font-semibold"}>
            Họ tên<span className={"text-red-500"}>*</span>
          </span>
          <input
            id={"full-name"}
            type={"text"}
            className={
              "block w-full rounded-lg border mt-2 border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
            }
            placeholder={"Họ tên"}
            autoComplete={"off"}
            {...register("name", { required: "Vui lòng nhập họ tên" })}
          />
          {errors.name && <span className={"absolute mt-1 text-xs text-red-600"}>{errors.name.message}</span>}
        </div>
        <div className={"mb-6 relative"}>
          <span className={"text-sm font-semibold"}>
            Email<span className={"text-red-500"}>*</span>
          </span>
          <input
            id={"email"}
            type={"text"}
            className={
              "block w-full rounded-lg border mt-2 border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
            }
            placeholder={"Email"}
            autoComplete={"off"}
            {...register("email", { validate: (value) => isEmailValid(value) || "Email không hợp lệ" })}
          />
          {errors.email && <span className={"absolute mt-1 text-xs text-red-600"}>{errors.email.message}</span>}
        </div>
        <div className={"mb-6 relative"}>
          <span className={"text-sm font-semibold"}>Số điện thoại</span>
          <input
            id={"phone"}
            type={"text"}
            className={
              "block w-full rounded-lg mt-2 border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
            }
            placeholder={"Số điện thoại"}
            autoComplete={"off"}
            {...register("phone", { validate: (value) => isPhoneNumberValid(value) })}
          />
          {errors.phone && <span className={"absolute mt-1 text-xs text-red-600"}>{errors.phone.message}</span>}
        </div>
        <div className={"mb-6 relative"}>
          <span className={"text-sm font-semibold"}>Địa chỉ</span>
          <input
            id={"address"}
            type={"text"}
            className={
              "block w-full mt-2 rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
            }
            placeholder={"Địa chỉ"}
            autoComplete={"off"}
            {...register("address")}
          />
        </div>
        <div className={"mb-6 relative"}>
          <span className={"text-sm font-semibold"}>Loại tài khoản</span>
          <select
            id={"type-account"}
            className={
              "block w-full mt-2 rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
            }
            {...register("role", { required: "Vui lòng chọn loại tài khoản" })}
            onChange={handleRoleChange}
          >
            <option value={"HOST"}>Ban tổ chức</option>
            <option value={"CANDIDATE"}>Thí sinh</option>
          </select>
          {errors.role && <span className={"absolute mt-1 text-xs text-red-600"}>{errors.role.message}</span>}
        </div>
        {role === "HOST" && (
          <div className={"mb-6 relative"}>
            <span className={"text-sm font-semibold"}>Chọn ban tổ chức</span>
            <select
              id={"host-id"}
              className={
                "block w-full mt-2 rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
              }
              {...register("host_id", { required: "Vui lòng chọn ban tổ chức" })}
            >
              {props.hosts.map((host) => {
                return (
                  <option key={`host-${host.id}`} value={host.id}>
                    {host.name}
                  </option>
                );
              })}
            </select>
            {errors.host_id && <span className={"absolute mt-1 text-xs text-red-600"}>{errors.host_id.message}</span>}
          </div>
        )}
        <div className={"mb-8 relative"}>
          <span className={"text-sm font-semibold"}>
            Tên đăng nhập<span className={"text-red-500"}>*</span>
          </span>
          <input
            id={"username"}
            type={"text"}
            className={
              "block w-full rounded-lg border mt-2 border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
            }
            placeholder={"Tên đăng nhập"}
            autoComplete={"off"}
            {...register("username", {
              validate: (value) => isUsernameValid(value),
              minLength: { value: 6, message: "Tên đăng nhập tối thiểu 6 ký tự" },
              maxLength: { value: 12, message: "Tên đăng nhập tối đa 12 ký tự" }
            })}
          />
          {errors.username && <span className={"absolute mt-1 text-xs text-red-600"}>{errors.username.message}</span>}
        </div>
        <div className={"flex flex-row items-center gap-x-3"}>
          <button
            className={
              "w-32 rounded-lg bg-[#0077b6] px-4 py-2 text-center text-sm font-semibold text-white duration-300 hover:bg-opacity-70 focus:outline-none"
            }
            type={"submit"}
          >
            Lưu
          </button>
          <button
            className={
              "w-32 rounded-lg bg-[#d00000] px-4 py-2 text-center text-sm font-semibold text-white duration-300 hover:bg-opacity-70 focus:outline-none"
            }
            type={"button"}
            onClick={props.closeModal}
          >
            Đóng
          </button>
        </div>
      </form>
    </ModalPortal>
  );
}

export default AddAccountModal;
