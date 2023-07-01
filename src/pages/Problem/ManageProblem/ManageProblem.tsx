import { useState } from "react";
import AddProblemModal from "~/components/Modal/AddProblemModal";
import { AiFillEdit } from "react-icons/ai";
import { BsFillTrashFill } from "react-icons/bs";
import { IProblem } from "~/types/problem.type";
import { deleteProblemById, getProblemList } from "~/queries/api/problem-service";
import { NavLink } from "react-router-dom";
import { Header } from "~/components";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ManageProblemSkeleton } from "~/skeletons/manage-problem-skeleton";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

type IProps = {
  stt: number;
  problem: IProblem;
  handleDelete: (id: number) => void;
};

function RowItem(props: IProps) {
  return (
    <tr className={"border-b bg-white"}>
      <th
        scope={"row"}
        className={"whitespace-nowrap border border-gray-300 px-6 py-4 text-center font-medium text-gray-900"}
      >
        {props.stt + 1}
      </th>
      <td className={"border border-gray-300 px-6 py-4 text-center"}>{props.problem.name}</td>
      <td className={"border border-gray-300 px-6 py-4 text-center"}>5</td>
      <td className={"border border-gray-300 px-6 py-4 text-center flex flex-row items-center justify-center"}>
        <NavLink
          className={"bg-blue-700 inline-block p-2 rounded-md hover:bg-blue-600 duration-300 mr-2"}
          to={`/problem/detail/${props.problem.id}`}
        >
          <AiFillEdit className={"w-7 h-7 text-white"} />
        </NavLink>
        <button
          className={"bg-red-700 inline-block p-2 rounded-md hover:bg-red-600 duration-300 ml-2"}
          onClick={() => props.handleDelete(props.problem.id)}
        >
          <BsFillTrashFill className={"w-7 h-7 text-white"} />
        </button>
      </td>
    </tr>
  );
}

function ManageProblem() {
  const queryClient = useQueryClient();
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [searchText, setSearchText] = useState<string>("");

  const { data: problems, isLoading } = useQuery({
    queryKey: ["manage-problem", "problem-list", searchText],
    queryFn: () => {
      return getProblemList(searchText);
    }
  });

  const { mutate: mutateDelete } = useMutation({
    mutationFn: (body: number) => {
      return deleteProblemById(body);
    }
  });

  const onChangeValue = (value: string | null) => {
    if (value === null) return;
    setSearchText(value);
  };
  const openModal = () => {
    setIsOpenModal(true);
  };
  const closeModal = () => {
    queryClient.invalidateQueries({ queryKey: ["manage-problem", "problem-list"] });
    setIsOpenModal(false);
  };

  const handleDeleteProblem = (id: number) => {
    Swal.fire({
      title: "Xác nhận xóa bài tập này?",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Xác nhận",
      cancelButtonText: "Hủy",
      allowOutsideClick: false
    }).then((result) => {
      if (result.isConfirmed) {
        mutateDelete(id, {
          onSuccess: (response: boolean) => {
            if (response) {
              toast("Xóa bài tập thành công", {
                type: "success",
                position: "bottom-right",
                autoClose: 3000,
                closeOnClick: false
              });
              queryClient.invalidateQueries({ queryKey: ["manage-problem", "problem-list"] });
            } else {
              toast("Xảy ra lỗi khi xóa bài tập", {
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
    <div className={"w-full"}>
      <Header placeHolder={"Tìm kiếm"} isUsed={true} onChangeValue={onChangeValue} />

      <div className={"mx-12 my-10"}>
        <div className={"flex flex-row items-center justify-between"}>
          <p className={"text-xl font-semibold"}>Danh sách bài tập</p>
          <button
            className={
              "px-4 py-2 duration-300 shadow-md bg-gray-300 hover:bg-gray-200 rounded-md text-base font-medium"
            }
            onClick={openModal}
            disabled={isLoading}
          >
            Thêm bài tập
          </button>
        </div>

        {isLoading && <ManageProblemSkeleton />}
        {!isLoading && (
          <table className={"w-full text-left text-sm text-gray-500 mt-5"}>
            <thead className={"bg-gray-200 text-xs uppercase text-gray-700"}>
              <tr>
                <th scope={"col"} className={"w-20 border border-black px-6 py-3 text-center"}>
                  STT
                </th>
                <th scope={"col"} className={"border border-black px-6 py-3 text-center"}>
                  Tên bài tập
                </th>
                <th scope={"col"} className={"w-40 border border-black px-6 py-3 text-center"}>
                  Số lượng giải được
                </th>
                <th scope={"col"} className={"w-52 border border-black px-6 py-3 text-center"}>
                  Thao tác
                </th>
              </tr>
            </thead>
            <tbody>
              {problems?.map((problem, index) => (
                <RowItem
                  key={`problem-${problem.id}`}
                  stt={index}
                  problem={problem}
                  handleDelete={handleDeleteProblem}
                />
              ))}
            </tbody>
          </table>
        )}
      </div>
      {isOpenModal && <AddProblemModal closeModal={closeModal} />}
    </div>
  );
}

export default ManageProblem;
