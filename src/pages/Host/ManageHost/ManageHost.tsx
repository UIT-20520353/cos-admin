import { useEffect, useState } from "react";
import Header from "~/components/Header";
import { AiFillEdit } from "react-icons/ai";
import { BsFillTrashFill } from "react-icons/bs";
import AddHostModal from "~/components/Modal/AddHostModal";
import { IHost } from "~/types/host.type";
import Swal from "sweetalert2";
import { deleteHost, getHostList } from "~/queries/api/host-service";

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
  const [hosts, setHosts] = useState<IHost[]>([]);
  const [filteredHosts, setFilteredHosts] = useState<IHost[]>([]);

  useEffect(() => {
    handleFetchData();
  }, []);

  const handleFetchData = async () => {
    Swal.fire({
      position: "center",
      title: "Đang lấy dữ liệu",
      allowOutsideClick: false,
      showConfirmButton: false,
      didOpen() {
        Swal.showLoading();
      }
    });

    const data = await getHostList();
    if (data && data.length !== 0) {
      setHosts(data ?? []);
      setFilteredHosts(data ?? []);
    }

    Swal.close();
  };

  const onChangeValue = (value: string | null) => {
    if (value === null) return;

    if (value === "") {
      const temp = [...hosts];
      setFilteredHosts(temp);
      return;
    }

    const filtered = value.toUpperCase();
    const result = hosts.filter((host) => {
      const temp = host.name.toUpperCase();
      return temp.includes(filtered);
    });
    setFilteredHosts(result);
  };
  const openModal = () => {
    setStatusModal({ isOpen: true, isEdit: null });
  };
  const closeModal = () => {
    setStatusModal({ isOpen: false, isEdit: null });
    handleFetchData();
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
        deleteHost(id).then((response) => {
          if (response) {
            Swal.fire({
              position: "center",
              titleText: "Xóa ban tổ chức thành công",
              icon: "success",
              allowOutsideClick: false,
              showConfirmButton: true,
              confirmButtonText: "Đồng ý",
              timer: 3000,
              didClose() {
                handleFetchData();
              }
            });
          } else {
            Swal.fire({
              position: "center",
              titleText: "Xảy ra lỗi khi xóa",
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
          >
            Thêm ban tổ chức
          </button>
        </div>
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
            {filteredHosts.map((host, index) => (
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
      </div>

      {statusModal.isOpen && <AddHostModal isEdit={statusModal.isEdit} closeModal={closeModal} />}
    </div>
  );
}

export default ManageHost;
