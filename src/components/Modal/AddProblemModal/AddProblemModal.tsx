import ModalPortal from "~/components/ModalPortal";
import { SubmitHandler, useForm } from "react-hook-form";
import { IProblemForm } from "~/types/form.type";
import Swal from "sweetalert2";
import { insertProblem } from "~/queries/api/problem-service";

type IProps = {
  closeModal: () => void;
};

function AddProblemModal(props: IProps) {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<IProblemForm>();

  const onSubmit: SubmitHandler<IProblemForm> = (data) => {
    Swal.fire({
      title: "Thông báo",
      text: "Xác nhận tạo bài tập mới với các thông tin đã nhập?",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Xác nhận",
      cancelButtonText: "Hủy",
      allowOutsideClick: false
    }).then((result) => {
      if (result.isConfirmed) {
        insertProblem(data).then((response) => {
          if (response) {
            Swal.fire({
              position: "center",
              titleText: "Thêm bài tập thành công",
              icon: "success",
              allowOutsideClick: false,
              showConfirmButton: true,
              confirmButtonText: "Đồng ý",
              timer: 3000,
              didClose() {
                props.closeModal();
              }
            });
          } else {
            Swal.fire({
              position: "center",
              titleText: "Xảy ra lỗi khi thêm bài tập",
              icon: "error",
              allowOutsideClick: false,
              showConfirmButton: true,
              confirmButtonText: "Đồng ý",
              timer: 3000
            });
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
          "fixed left-1/2 z-40 top-1/2 max-h-[95%] w-3/5 -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-md bg-white p-5"
        }
      >
        <p className={"mb-5 text-lg font-semibold"}>Tạo bài tập mới</p>
        <div className={"mb-6 relative"}>
          <span className={"text-sm font-semibold"}>
            Tên bài tập<span className={"text-red-500"}>*</span>
          </span>
          <input
            id={"name-problem"}
            type={"text"}
            className={
              "block w-full mt-2 rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
            }
            placeholder={"Tên bài tập"}
            autoComplete={"off"}
            {...register("name", { required: "Vui lòng nhập tên bài" })}
          />
          {errors.name && <span className={"absolute mt-1 text-xs text-red-600"}>{errors.name.message}</span>}
        </div>
        <div className={"mb-6 relative"}>
          <span className={"text-sm font-semibold"}>
            Đề bài<span className={"text-red-500"}>*</span>
          </span>
          <textarea
            id={"detail"}
            placeholder={"Đề bài"}
            rows={10}
            className="block w-full mt-2 resize-none rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
            autoComplete={"off"}
            {...register("detail", { required: "Vui lòng nhập đề bài" })}
          />
          {errors.detail && <span className={"absolute mt-1 text-xs text-red-600"}>{errors.detail.message}</span>}
        </div>
        <div className={"mb-6 relative"}>
          <span className={"text-sm font-semibold"}>
            Input mẫu<span className={"text-red-500"}>*</span>
          </span>
          <textarea
            id={"example-input"}
            placeholder={"Input mẫu"}
            rows={5}
            className="block w-full mt-2 resize-none rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
            autoComplete={"off"}
            {...register("example_input", { required: "Vui lòng nhập dữ liệu vào mẫu" })}
          />
          {errors.example_input && (
            <span className={"absolute mt-1 text-xs text-red-600"}>{errors.example_input.message}</span>
          )}
        </div>
        <div className={"mb-6 relative"}>
          <span className={"text-sm font-semibold"}>
            Output mẫu<span className={"text-red-500"}>*</span>
          </span>
          <textarea
            id={"example-output"}
            placeholder={"Output mẫu"}
            rows={5}
            className="block w-full mt-2 resize-none rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
            autoComplete={"off"}
            {...register("example_output", { required: "Vui lòng nhập dữ liệu ra mẫu" })}
          />
          {errors.example_output && (
            <span className={"absolute mt-1 text-xs text-red-600"}>{errors.example_output.message}</span>
          )}
        </div>
        <div className={"flex flex-row items-center gap-x-3"}>
          <button
            className={
              "w-32 rounded-lg bg-[#0077b6] px-4 py-2 text-center text-sm font-semibold text-white duration-300 hover:bg-opacity-70"
            }
            type={"submit"}
          >
            Lưu
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

export default AddProblemModal;
