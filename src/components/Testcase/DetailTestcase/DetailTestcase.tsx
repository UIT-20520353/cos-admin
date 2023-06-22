import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { AiFillCaretDown } from "react-icons/ai";
import { ITestcaseForm } from "~/types/form.type";
import { ITestcase } from "~/types/testcase.type";
import { deleteTestcaseById, updateTestcase } from "~/queries/api/testcase-service";

type IProps = {
  stt: number;
  testcase: ITestcase;
  loadTestcases: () => void;
};

function DetailTestcase(props: IProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue
  } = useForm<ITestcaseForm>();

  useEffect(() => {
    setValue("input", props.testcase.input);
    setValue("output", props.testcase.output);
  }, []);
  const onSubmit: SubmitHandler<ITestcase> = (data) => {
    Swal.fire({
      title: "Cập nhật thông tin testcase",
      text: `Xác nhận sẽ cập nhật các thông tin của testcase?`,
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Cập nhật",
      cancelButtonText: "Hủy",
      allowOutsideClick: false
    }).then((result) => {
      if (result.isConfirmed) {
        updateTestcase(props.testcase.id, data).then((response) => {
          if (response) {
            Swal.fire({
              position: "center",
              timer: 4000,
              icon: "success",
              showConfirmButton: true,
              title: "Cập nhật thông tin testcase thành công",
              allowOutsideClick: false,
              didClose() {
                props.loadTestcases();
              }
            });
          } else {
            Swal.fire({
              position: "center",
              timer: 4000,
              icon: "error",
              showConfirmButton: true,
              title: "Xảy ra lỗi khi cập nhật testcase",
              allowOutsideClick: false
            });
          }
        });
      }
    });
  };
  const handleDelete = () => {
    Swal.fire({
      title: "Xóa testcase",
      text: `Xóa tất cả thông tin của testcase ${props.stt + 1}?`,
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Xác nhận",
      cancelButtonText: "Hủy",
      allowOutsideClick: false
    }).then((result) => {
      if (result.isConfirmed) {
        deleteTestcaseById(props.testcase.id).then((response) => {
          if (response) {
            Swal.fire({
              position: "center",
              timer: 4000,
              icon: "success",
              showConfirmButton: true,
              title: "Xóa testcase thành công",
              allowOutsideClick: false,
              didClose() {
                props.loadTestcases();
              }
            });
          } else {
            Swal.fire({
              position: "center",
              timer: 4000,
              icon: "error",
              showConfirmButton: true,
              title: "Xảy ra lỗi khi xóa testcase",
              allowOutsideClick: false
            });
          }
        });
      }
    });
  };

  return (
    <li id={`testcase-${props.testcase.id}`} className={"grid gap-3 rounded-md bg-gray-100 p-3 shadow-md"}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={"flex flex-row items-center justify-between"}>
          <p className={"text-lg font-semibold"}>Testcase {props.stt + 1}</p>
          <AiFillCaretDown
            onClick={() => setIsOpen(!isOpen)}
            className={`h-8 w-8 ${isOpen && "rotate-180"} cursor-pointer text-gray-600 duration-300 hover:text-black`}
          />
        </div>
        <div className={`${!isOpen && "hidden"}`}>
          <div className={"mb-6 relative"}>
            <span className={"text-sm font-semibold"}>Input</span>
            <textarea
              placeholder={"Input"}
              rows={10}
              className="block w-full mt-2 resize-none rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
              autoComplete={"off"}
              {...register("input", { required: "Input không được bỏ trống" })}
            />
            {errors.input && <span className={"text-xs absolute text-red-600"}>{errors.input.message}</span>}
          </div>
          <div className={"mb-6 relative"}>
            <span className={"text-sm font-semibold"}>Output</span>
            <textarea
              placeholder={"Output"}
              rows={10}
              className="block w-full mt-2 resize-none rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
              autoComplete={"off"}
              {...register("output", { required: "Output không được bỏ trống" })}
            />
            {errors.output && <span className={"text-xs absolute text-red-600"}>{errors.output.message}</span>}
          </div>
          <div className={`flex flex-row items-center gap-x-3 duration-300`}>
            <button
              className={
                "w-40 rounded-lg bg-[#023e8a] py-3 text-base font-semibold text-white duration-200 hover:opacity-80"
              }
              type={"submit"}
            >
              Cập nhật
            </button>
            <button
              className={
                "w-40 rounded-lg bg-[#d00000] py-3 text-base font-semibold text-white duration-200 hover:opacity-70"
              }
              type={"button"}
              onClick={handleDelete}
            >
              Xóa testcase
            </button>
          </div>
        </div>
      </form>
    </li>
  );
}

export default DetailTestcase;
