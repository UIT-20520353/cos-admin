import ModalPortal from "~/components/ModalPortal";
import { SubmitHandler, useForm } from "react-hook-form";
import { IHostForm } from "~/types/form.type";
import Swal from "sweetalert2";
import { addHost, updateHostInfoById } from "~/queries/api/host-service";
import { useEffect } from "react";
import { IHost } from "~/types/host.type";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

type IProps = {
  closeModal: () => void;
  isEdit: IHost | null;
};

interface DataUpdate {
  id: number;
  data: IHostForm;
}

const isEmailValid = (value: string | null) => {
  if (!value) {
    return "Vui lòng nhập email";
  }

  // Kiểm tra tính hợp lệ của email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(value) || "Email không hợp lệ";
};

const isPhoneNumberValid = (phoneNumber: string | null): boolean | string => {
  if (!phoneNumber) return "Vui lòng nhập số điện thoại";

  const phoneRegex = /^(03[2-9]|05[2689]|07[06-9]|08[1-9]|09[0-9])[0-9]{7}$/;
  return phoneRegex.test(phoneNumber) || "Số điện thoại không hợp lệ";
};

function AddHostModal(props: IProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue
  } = useForm<IHostForm>();

  const { mutate: mutateAdd } = useMutation({
    mutationFn: (body: IHostForm) => {
      return addHost(body);
    }
  });
  const { mutate: mutateUpdate } = useMutation({
    mutationFn: (body: DataUpdate) => {
      return updateHostInfoById(body.id, body.data);
    }
  });

  useEffect(() => {
    if (props.isEdit !== null) {
      setValue("name", props.isEdit.name);
      setValue("email", props.isEdit.email);
      setValue("phone", props.isEdit.phone);
      setValue("address", props.isEdit.address);
    }
  }, []);

  const onSubmit: SubmitHandler<IHostForm> = (data) => {
    Swal.fire({
      title: "Thông báo",
      text: props.isEdit !== null ? "Cập nhật thông tin của ban tổ chức?" : "Thêm mới ban tổ chức?",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Xác nhận",
      cancelButtonText: "Hủy",
      allowOutsideClick: false
    }).then((result) => {
      if (result.isConfirmed) {
        if (props.isEdit === null) {
          mutateAdd(data, {
            onSuccess: (response: boolean) => {
              if (response) {
                toast("Thêm ban tổ chức thành công", {
                  type: "success",
                  position: "bottom-right",
                  autoClose: 3000,
                  closeOnClick: false
                });
                props.closeModal();
              } else {
                toast("Xảy ra lỗi khi thêm ban tổ chức", {
                  type: "error",
                  position: "bottom-right",
                  autoClose: 3000,
                  closeOnClick: false
                });
              }
            }
          });
        } else {
          const body: DataUpdate = {
            id: props.isEdit.id,
            data
          };
          mutateUpdate(body, {
            onSuccess: (response: boolean) => {
              if (response) {
                toast("Cập nhật thông tin ban tổ chức thành công", {
                  type: "success",
                  position: "bottom-right",
                  autoClose: 3000,
                  closeOnClick: false
                });
                props.closeModal();
              } else {
                toast("Xảy ra lỗi khi cập nhật thông tin ban tổ chức", {
                  type: "error",
                  position: "bottom-right",
                  autoClose: 3000,
                  closeOnClick: false
                });
              }
            }
          });
        }
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
        <p className={"mb-5 text-lg font-semibold"}>
          {props.isEdit === null ? "Thêm ban tổ chức" : "Cập nhật thông tin ban tổ chức"}
        </p>
        <div className={"mb-6 relative"}>
          <span className={"text-sm font-semibold"}>
            Tên ban tổ chức<span className={"text-red-500"}>*</span>
          </span>
          <input
            id={"host-name"}
            type={"text"}
            className={
              "block w-full rounded-lg mt-2 border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
            }
            placeholder={"Tên ban tổ chức"}
            autoComplete={"off"}
            {...register("name", { required: "Vui lòng nhập tên ban tổ chức" })}
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
          <span className={"text-sm font-semibold"}>
            Số điện thoại<span className={"text-red-500"}>*</span>
          </span>
          <input
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
        <div className={"mb-8 relative"}>
          <span className={"text-sm font-semibold"}>
            Địa chỉ<span className={"text-red-500"}>*</span>
          </span>
          <input
            type={"text"}
            className={
              "block w-full mt-2 rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
            }
            placeholder={"Địa chỉ"}
            autoComplete={"off"}
            {...register("address", { required: "Vui lòng nhập địa chỉ" })}
          />
          {errors.address && <span className={"absolute mt-1 text-xs text-red-600"}>{errors.address.message}</span>}
        </div>
        <div className={"flex flex-row items-center gap-x-3"}>
          <button
            className={
              "w-32 rounded-lg bg-[#0077b6] px-4 py-2 text-center text-sm font-semibold text-white duration-300 hover:bg-opacity-70 focus:outline-none"
            }
            type={"submit"}
          >
            {props.isEdit !== null ? "Cập nhật" : "Lưu"}
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

export default AddHostModal;
