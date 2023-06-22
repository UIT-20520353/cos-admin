import ModalPortal from "~/components/ModalPortal";
import { SubmitHandler, useForm } from "react-hook-form";
import { ITestcaseForm } from "~/types/form.type";
import Swal from "sweetalert2";
import { insertTestcase } from "~/queries/api/testcase-service";

type IProps = {
  problem_id: number;
  closeModal: () => void;
};

function AddTestcaseModal(props: IProps) {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<ITestcaseForm>();

  const onSubmit: SubmitHandler<ITestcaseForm> = (data) => {
    Swal.fire({
      title: "Thông báo",
      text: "Xác nhận tạo testcase mới?",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Xác nhận",
      cancelButtonText: "Hủy",
      allowOutsideClick: false
    }).then((result) => {
      if (result.isConfirmed) {
        insertTestcase(props.problem_id, data).then((response) => {
          if (response) {
            Swal.fire({
              position: "center",
              titleText: "Thêm testcase thành công",
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
              titleText: "Xảy ra lỗi khi thêm testcase",
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
        <p className={"mb-5 text-lg font-semibold"}>Thêm testcase mới</p>
        <div className={"mb-6 relative"}>
          <span className={"text-sm font-semibold"}>Input</span>
          <textarea
            placeholder={"Input"}
            rows={10}
            className="block w-full resize-none mt-2 rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
            {...register("input", { required: "Input không được bỏ trống" })}
            autoComplete={"off"}
          />
          {errors.input && <span className={"text-xs absolute text-red-600"}>{errors.input.message}</span>}
        </div>
        <div className={"mb-6 relative"}>
          <span className={"text-sm font-semibold"}>Output</span>
          <textarea
            placeholder={"Output"}
            rows={10}
            className="block w-full resize-none mt-2 rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
            {...register("output", { required: "Output không được bỏ trống" })}
            autoComplete={"off"}
          />
          {errors.output && <span className={"text-xs absolute text-red-600"}>{errors.output.message}</span>}
        </div>
        <div className={"flex flex-row items-center gap-x-3 mt-4"}>
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

export default AddTestcaseModal;
