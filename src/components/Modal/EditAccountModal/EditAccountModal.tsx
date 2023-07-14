import ModalPortal from "~/components/ModalPortal";
import { IAccount, IManageAccount } from "~/types/account.type";
import { SubmitHandler, useForm } from "react-hook-form";
import { IAccountForm } from "~/types/form.type";
import { useEffect } from "react";
import { isEmailValid, isPhoneNumberValid } from "~/utils/ValidateForm";
import Swal from "sweetalert2";
import { checkEmailExist, updateAccountInfoById } from "~/queries/api/account-service";
import { IHost } from "~/types/host.type";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

type IProps = {
  hosts: IHost[];
  account: IManageAccount;
  closeModal: () => void;
};

function EditAccountModal(props: IProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue
  } = useForm<IAccountForm>();

  const { mutate: updateAccount } = useMutation({
    mutationFn: (body: { id: number; name: string; email: string; phone: string; address: string }) => {
      return updateAccountInfoById(body.id, body.name, body.email, body.phone, body.address);
    }
  });

  useEffect(() => {
    props.hosts.forEach((host) => {
      if (host.id === props.account.host_id) {
        setValue("host_name", host.name);
        return;
      }
    });
    setValue("name", props.account.name);
    setValue("email", props.account.email);
    setValue("phone", props.account.phone);
    setValue("address", props.account.address);
    setValue("role", props.account.role_name === "CANDIDATE" ? "Thí sinh" : "Ban tổ chức");
  }, []);

  const onSubmit: SubmitHandler<IAccountForm> = async (data) => {
    if (data.email !== props.account.email) {
      const result = await checkEmailExist(data.email);
      if (result) {
        toast("Email đã được sử dụng", {
          type: "error",
          position: "bottom-right",
          autoClose: 3000,
          closeOnClick: false
        });
        return;
      }
    }

    Swal.fire({
      title: "Xác nhận cập nhật thông tin tài khoản?",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Xác nhận",
      cancelButtonText: "Hủy",
      allowOutsideClick: false
    }).then((result) => {
      if (result.isConfirmed) {
        const body = {
          id: props.account.id,
          name: data.name,
          email: data.email,
          phone: data.phone ? data.phone : "",
          address: data.address ? data.address : ""
        };
        updateAccount(body, {
          onSuccess: (response: IAccount) => {
            if (response.id !== -1) {
              toast("Cập nhật thông tin tài khoản thành công", {
                type: "success",
                position: "bottom-right",
                autoClose: 3000,
                closeOnClick: false
              });
              props.closeModal();
            } else {
              toast("Xảy ra lỗi khi cập nhật thông tin tài khoản", {
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
        <p className={"mb-5 text-lg font-semibold"}>Cập nhật thông tin tài khoản</p>
        <div className={"mb-6 relative"}>
          <span className={"text-sm font-semibold"}>
            Họ tên<span className={"text-red-500"}>*</span>
          </span>
          <input
            id={"full-name"}
            type={"text"}
            className={
              "block w-full mt-2 rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
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
              "block w-full rounded-lg mt-2 border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
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
              "block w-full mt-2 rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
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
              "block w-full rounded-lg mt-2 border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
            }
            placeholder={"Địa chỉ"}
            autoComplete={"off"}
            {...register("address")}
          />
        </div>
        <div className={"mb-6 relative"}>
          <span className={"text-sm font-semibold"}>Loại tài khoản</span>
          <input
            id={"type-account"}
            className={
              "block w-full rounded-lg mt-2 border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:outline-none"
            }
            readOnly={true}
            {...register("role")}
          />
        </div>
        {props.account.role_name === "HOST" && (
          <div className={"mb-6 relative"}>
            <span className={"text-sm font-semibold"}>Trường / Công ty</span>
            <input
              id={"host-id"}
              className={
                "block w-full rounded-lg mt-2 border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:outline-none"
              }
              readOnly={true}
              {...register("host_name")}
            />
          </div>
        )}
        <div className={"flex flex-row items-center gap-x-3"}>
          <button
            className={
              "w-32 rounded-lg bg-[#0077b6] px-4 py-2 text-center text-sm font-semibold text-white duration-300 hover:bg-opacity-70"
            }
            type={"submit"}
          >
            Cập nhật
          </button>
          <button
            className={
              "w-32 rounded-lg bg-[#d00000] px-4 py-2 text-center text-sm font-semibold text-white duration-300 hover:bg-opacity-70"
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

export default EditAccountModal;
