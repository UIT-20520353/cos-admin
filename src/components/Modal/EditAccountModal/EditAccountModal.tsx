import ModalPortal from "~/components/ModalPortal";
import { IManageAccount } from "~/types/account.type";
import { SubmitHandler, useForm } from "react-hook-form";
import { IAccountForm } from "~/types/form.type";
import { useEffect } from "react";
import { isEmailValid, isPhoneNumberValid } from "~/utils/ValidateForm";
import { getHostInfoById } from "~/queries/api/host-service";
import Swal from "sweetalert2";
import { updateAccountInfoById } from "~/queries/api/account-service";

type IProps = {
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

  useEffect(() => {
    if (props.account.host_id !== null)
      getHostInfoById(props.account.host_id).then((response) => {
        if (response && response.length !== 0) {
          setValue("host_name", response[0].name);
        }
      });

    setValue("name", props.account.name);
    setValue("email", props.account.email);
    setValue("phone", props.account.phone);
    setValue("address", props.account.address);
    setValue("role", props.account.role_name === "CANDIDATE" ? "Thí sinh" : "Ban tổ chức");
  }, []);

  const onSubmit: SubmitHandler<IAccountForm> = (data) => {
    Swal.fire({
      title: "Thông báo",
      text: "Xác nhận cập nhật thông tin tài khoản?",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Xác nhận",
      cancelButtonText: "Hủy",
      allowOutsideClick: false
    }).then((result) => {
      if (result.isConfirmed) {
        updateAccountInfoById(
          props.account.id,
          data.name,
          data.email,
          data.phone ? data.phone : "",
          data.address ? data.address : ""
        ).then((res) => {
          if (res) {
            Swal.fire({
              position: "center",
              titleText: "Cập nhật thông tin tài khoản thành công",
              icon: "success",
              allowOutsideClick: false,
              showConfirmButton: true,
              confirmButtonText: "Đồng ý",
              timer: 3000,
              didClose() {
                props.closeModal();
              }
            });
          }
        });
      }
    });
  };

  return (
    <ModalPortal>
      <div className={"fixed left-0 top-0 h-screen w-full bg-black opacity-50"}></div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={
          "fixed left-1/2 top-1/2 max-h-[95%] w-3/5 -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-md bg-white p-5"
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
