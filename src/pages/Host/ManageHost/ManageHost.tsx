import { useState } from "react";
import { AiFillEdit } from "react-icons/ai";
import { BsFillTrashFill } from "react-icons/bs";
import AddHostModal from "~/components/Modal/AddHostModal";
import { IHost } from "~/types/host.type";
import Swal from "sweetalert2";
import { deleteHost, getHostList } from "~/queries/api/host-service";
import { Header } from "~/components";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ManageHostSkeleton } from "~/skeletons";
import { IAccount } from "~/types/account.type";
import { toast } from "react-toastify";

type IProps = {
  stt: number;
  host: IHost;
  deleteHost: (id: number) => void;
  openEditForm: (host: IHost) => void;
};

function RowItem(props: IProps) {
  return (
    <tr id={`host-${props.host.id}`} className={"border-b bg-white"}>
      <th
        scope={"row"}
        className={"whitespace-nowrap border border-gray-300 px-6 py-4 text-center font-medium text-gray-900"}
      >
        {props.stt + 1}
      </th>
      <td className={"border border-gray-300 px-6 py-4 text-center"}>{props.host.name}</td>
      <td className={"border border-gray-300 px-6 py-4 text-center"}>{props.host.email}</td>
      <td className={"border border-gray-300 px-6 py-4 text-center"}>{props.host.phone}</td>
      <td className={"border border-gray-300 px-6 py-4 text-center"}>{props.host.address}</td>
      <td className={"border border-gray-300 px-6 py-4 text-center"}>
        <button
          className={"bg-blue-700 p-2 rounded-md hover:bg-blue-600 duration-300 mr-2 focus:outline-none"}
          onClick={() => props.openEditForm(props.host)}
        >
          <AiFillEdit className={"w-7 h-7 text-white"} />
        </button>
        <button
          className={"bg-red-700 p-2 rounded-md hover:bg-red-600 duration-300 ml-2 focus:outline-none"}
          onClick={() => props.deleteHost(props.host.id)}
        >
          <BsFillTrashFill className={"w-7 h-7 text-white"} />
        </button>
      </td>
    </tr>
  );
}

function ManageHost() {
  const [statusModal, setStatusModal] = useState<{ isOpen: boolean; isEdit: IHost | null }>({
    isOpen: false,
    isEdit: null
  });
  const [searchText, setSearchText] = useState<string>("");
  const queryClient = useQueryClient();
  const { data: hosts, isLoading } = useQuery({
    queryKey: ["host-list", searchText],
    queryFn: () => {
      return getHostList(searchText);
    }
  });
  const { mutate: mutateDelete } = useMutation({
    mutationFn: (body: number) => {
      return deleteHost(body);
    }
  });

  const onChangeValue = (value: string | null) => {
    if (value === null) return;
    setSearchText(value);
  };
  const openModal = () => {
    setStatusModal({ isOpen: true, isEdit: null });
  };
  const closeModal = () => {
    queryClient.invalidateQueries({ queryKey: ["host-list"] });
    setStatusModal({ isOpen: false, isEdit: null });
  };
  const openEditForm = (host: IHost) => {
    setStatusModal({ isOpen: true, isEdit: host });
  };

  const handleDeleteHost = (id: number) => {
    Swal.fire({
      title: "Thông báo",
      text: "Xác nhận xóa ban tổ chức này?",
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
              toast("Xóa ban tổ chức thành công", {
                type: "success",
                position: "bottom-right",
                autoClose: 3000,
                closeOnClick: false
              });
              queryClient.invalidateQueries({ queryKey: ["host-list"] });
            } else {
              toast("Xảy ra lỗi khi xóa", {
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
      <Header placeHolder={"Nhập tên ban tổ chức"} isUsed={true} onChangeValue={onChangeValue} />

      <div className={"mx-12 my-10"}>
        <div className={"flex flex-row items-center justify-between"}>
          <p className={"text-xl font-semibold"}>Danh sách ban tổ chức</p>
          <button
            className={
              "px-4 py-2 duration-300 shadow-md bg-gray-300 hover:bg-gray-200 rounded-md text-base font-medium"
            }
            onClick={openModal}
            disabled={isLoading}
          >
            Thêm ban tổ chức
          </button>
        </div>
        {isLoading && <ManageHostSkeleton />}
        {!isLoading && (
          <table className={"w-full text-left text-sm text-gray-500 mt-5"}>
            <thead className={"bg-gray-200 text-xs uppercase text-gray-700"}>
              <tr>
                <th scope={"col"} className={"w-20 border border-black px-6 py-3 text-center"}>
                  STT
                </th>
                <th scope={"col"} className={"border border-black px-6 py-3 text-center"}>
                  Tên ban tổ chức
                </th>
                <th scope={"col"} className={"w-44 border border-black px-6 py-3 text-center"}>
                  Email
                </th>
                <th scope={"col"} className={"w-44 border border-black px-6 py-3 text-center"}>
                  Số điện thoại
                </th>
                <th scope={"col"} className={"w-44 border border-black px-6 py-3 text-center"}>
                  Địa chỉ
                </th>
                <th scope={"col"} className={"w-48 border border-black px-6 py-3 text-center"}>
                  Thao tác
                </th>
              </tr>
            </thead>
            <tbody>
              {hosts?.map((host, index) => (
                <RowItem
                  openEditForm={openEditForm}
                  stt={index}
                  key={`host-${host.id}`}
                  host={host}
                  deleteHost={handleDeleteHost}
                />
              ))}
            </tbody>
          </table>
        )}
      </div>

      {statusModal.isOpen && <AddHostModal isEdit={statusModal.isEdit} closeModal={closeModal} />}
    </div>
  );
}

export default ManageHost;
