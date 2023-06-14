import React, { useEffect, useState } from "react";
import Header from "~/components/Header";
import { AiFillEdit } from "react-icons/ai";
import { BsFillTrashFill } from "react-icons/bs";
import AddAccountModal from "~/components/Modal/AddAccountModal";
import { deleteAccountById, getAccountList } from "~/queries/api/account-service";
import Swal from "sweetalert2";
import { IAccount, IManageAccount } from "~/types/account.type";
import { IHost } from "~/types/host.type";
import { getHostList } from "~/queries/api/host-service";
import EditAccountModal from "~/components/Modal/EditAccountModal";

type IProps = {
  stt: number;
  account: IManageAccount;
  deleteAccount: (id: number) => void;
  openEditForm: (account: IAccount) => void;
};

function RowItem(props: IProps) {
  return (
    <tr id={`account-${props.account.id}`} className={"border-b bg-white"}>
      <th
        scope={"row"}
        className={"whitespace-nowrap border border-gray-300 px-6 py-4 text-center font-medium text-gray-900"}
      >
        {props.stt + 1}
      </th>
      <td className={"border border-gray-300 px-6 py-4 text-center"}>{props.account.name}</td>
      <td className={"border border-gray-300 px-6 py-4 text-center"}>
        {props.account.role_name === "HOST" ? "Ban tổ chức" : "Thí sinh"}
      </td>
      <td className={"border border-gray-300 px-6 py-4 text-center"}>
        <button
          className={"bg-blue-700 p-2 rounded-md hover:bg-blue-600 duration-300 mr-2"}
          onClick={() => props.openEditForm(props.account)}
        >
          <AiFillEdit className={"w-7 h-7 text-white"} />
        </button>
        <button
          className={"bg-red-700 p-2 rounded-md hover:bg-red-600 duration-300 ml-2"}
          onClick={() => props.deleteAccount(props.account.id)}
        >
          <BsFillTrashFill className={"w-7 h-7 text-white"} />
        </button>
      </td>
    </tr>
  );
}

function ManageAccount() {
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [isEdit, setIsEdit] = useState<IManageAccount | null>(null);
  const [accounts, setAccounts] = useState<IManageAccount[]>([]);
  const [filteredAccounts, setFilteredAccounts] = useState<IManageAccount[]>([]);
  const [hosts, setHosts] = useState<IHost>([]);

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

    const data = await getAccountList();
    if (data && data.length !== 0) {
      setAccounts(data ?? []);
      setFilteredAccounts(data ?? []);
    }
    const hostsResponse = await getHostList();
    if (hostsResponse && hostsResponse.length !== 0) setHosts(hostsResponse ?? []);

    Swal.close();
  };

  const onChangeValue = (value: string | null) => {
    if (value === null) return;
    if (accounts.length === 0) return;

    if (value === "") {
      const temp = [...accounts];
      setFilteredAccounts(temp);
      return;
    }

    const filtered = value.toUpperCase();
    const result = accounts.filter((account) => {
      const temp = account.name.toUpperCase();
      return temp.includes(filtered);
    });

    setFilteredAccounts(result);
  };
  const openModal = () => {
    setIsOpenModal(true);
  };
  const closeModal = () => {
    setIsOpenModal(false);
    handleFetchData();
  };
  const handleDeleteAccount = (id: number) => {
    Swal.fire({
      title: "Thông báo",
      text: "Xác nhận xóa tài khoản này?",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Xác nhận",
      cancelButtonText: "Hủy",
      allowOutsideClick: false
    }).then((result) => {
      if (result.isConfirmed) {
        deleteAccountById(id).then((response) => {
          if (response) {
            Swal.fire({
              position: "center",
              titleText: "Xóa tài khoán thành công",
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
  const openEditForm = (account: IAccount) => {
    setIsEdit(account);
  };
  const closeEditForm = () => {
    setIsEdit(null);
    handleFetchData();
  };

  return (
    <div className={"w-full"}>
      <Header placeHolder={"Nhập tên"} isUsed={true} onChangeValue={onChangeValue} />

      <div className={"mx-12 my-10"}>
        <div className={"flex flex-row items-center justify-between"}>
          <p className={"text-xl font-semibold"}>Quản lý tài khoản</p>
          <button
            className={
              "px-4 py-2 duration-300 shadow-md bg-gray-300 hover:bg-gray-200 rounded-md text-base font-medium"
            }
            onClick={openModal}
          >
            Thêm tài khoản
          </button>
        </div>
        <table className={"w-full text-left text-sm text-gray-500 mt-5"}>
          <thead className={"bg-gray-200 text-xs uppercase text-gray-700"}>
            <tr>
              <th scope={"col"} className={"w-20 border border-black px-6 py-3 text-center"}>
                STT
              </th>
              <th scope={"col"} className={"border border-black px-6 py-3 text-center"}>
                Họ tên
              </th>
              <th scope={"col"} className={"w-44 border border-black px-6 py-3 text-center"}>
                Loại tài khoản
              </th>
              <th scope={"col"} className={"w-52 border border-black px-6 py-3 text-center"}>
                Thao tác
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredAccounts.map((account, index) => (
              <RowItem
                openEditForm={openEditForm}
                deleteAccount={handleDeleteAccount}
                stt={index}
                key={`account-${account.id}`}
                account={account}
              />
            ))}
          </tbody>
        </table>
      </div>
      {isOpenModal && <AddAccountModal hosts={hosts} closeModal={closeModal} />}
      {isEdit && <EditAccountModal account={isEdit} closeModal={closeEditForm} />}
    </div>
  );
}

export default ManageAccount;
