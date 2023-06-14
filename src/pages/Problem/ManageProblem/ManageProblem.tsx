import Header from "~/components/Header";
import React, { useState } from "react";
import AddProblemModal from "~/components/Modal/AddProblemModal";
import { AiFillEdit } from "react-icons/ai";
import { BsFillTrashFill } from "react-icons/bs";

function ManageProblem() {
  const [isOpenModal, setIsOpenModal] = useState(false);

  const onChangeValue = (value: string | null) => {
    if (value === null) return;
  };
  const openModal = () => {
    setIsOpenModal(true);
  };
  const closeModal = () => {
    setIsOpenModal(false);
  };

  return (
    <div className={"w-full"}>
      <Header placeHolder={"Tìm kiếm"} isUsed={false} onChangeValue={onChangeValue} />

      <div className={"mx-12 my-10"}>
        <div className={"flex flex-row items-center justify-between"}>
          <p className={"text-xl font-semibold"}>Danh sách bài tập</p>
          <button
            className={
              "px-4 py-2 duration-300 shadow-md bg-gray-300 hover:bg-gray-200 rounded-md text-base font-medium"
            }
            onClick={openModal}
          >
            Thêm bài tập
          </button>
        </div>
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
            <tr className={"border-b bg-white"}>
              <th
                scope={"row"}
                className={"whitespace-nowrap border border-gray-300 px-6 py-4 text-center font-medium text-gray-900"}
              >
                1
              </th>
              <td className={"border border-gray-300 px-6 py-4 text-center"}>Tính tổng</td>
              <td className={"border border-gray-300 px-6 py-4 text-center"}>5</td>
              <td className={"border border-gray-300 px-6 py-4 text-center"}>
                <button className={"bg-blue-700 p-2 rounded-md hover:bg-blue-600 duration-300 mr-2"}>
                  <AiFillEdit className={"w-7 h-7 text-white"} />
                </button>
                <button className={"bg-red-700 p-2 rounded-md hover:bg-red-600 duration-300 ml-2"}>
                  <BsFillTrashFill className={"w-7 h-7 text-white"} />
                </button>
              </td>
            </tr>
            <tr className={"border-b bg-white"}>
              <th
                scope={"row"}
                className={"whitespace-nowrap border border-gray-300 px-6 py-4 text-center font-medium text-gray-900"}
              >
                2
              </th>
              <td className={"border border-gray-300 px-6 py-4 text-center"}>Đường đi ngắn nhất</td>
              <td className={"border border-gray-300 px-6 py-4 text-center"}>2</td>
              <td className={"border border-gray-300 px-6 py-4 text-center"}>
                <button className={"bg-blue-700 p-2 rounded-md hover:bg-blue-600 duration-300 mr-2"}>
                  <AiFillEdit className={"w-7 h-7 text-white"} />
                </button>
                <button className={"bg-red-700 p-2 rounded-md hover:bg-red-600 duration-300 ml-2"}>
                  <BsFillTrashFill className={"w-7 h-7 text-white"} />
                </button>
              </td>
            </tr>
            <tr className={"border-b bg-white"}>
              <th
                scope={"row"}
                className={"whitespace-nowrap border border-gray-300 px-6 py-4 text-center font-medium text-gray-900"}
              >
                3
              </th>
              <td className={"border border-gray-300 px-6 py-4 text-center"}>Tổng mảng</td>
              <td className={"border border-gray-300 px-6 py-4 text-center"}>12</td>
              <td className={"border border-gray-300 px-6 py-4 text-center"}>
                <button className={"bg-blue-700 p-2 rounded-md hover:bg-blue-600 duration-300 mr-2"}>
                  <AiFillEdit className={"w-7 h-7 text-white"} />
                </button>
                <button className={"bg-red-700 p-2 rounded-md hover:bg-red-600 duration-300 ml-2"}>
                  <BsFillTrashFill className={"w-7 h-7 text-white"} />
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      {isOpenModal && <AddProblemModal closeModal={closeModal} />}
    </div>
  );
}

export default ManageProblem;
