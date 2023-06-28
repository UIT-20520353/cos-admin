import { NavLink, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { getProblemById } from "~/queries/api/problem-service";
import { IProblem } from "~/types/problem.type";
import { ITestcase } from "~/types/testcase.type";
import { getTestcaseList } from "~/queries/api/testcase-service";
import DetailTestcase from "~/components/Testcase/DetailTestcase";
import AddTestcaseModal from "~/components/Modal/AddTestcaseModal";
import { Header } from "~/components";

function DetailProblem() {
  const { id } = useParams<{ id: string }>();
  const [problems, setProblems] = useState<IProblem[]>([]);
  const [testcases, setTestcases] = useState<ITestcase[]>([]);
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);

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

    const data = await getProblemById(parseInt(id ?? "-1"));
    if (data) {
      setProblems(data ?? []);
    }
    const responseTestcases = await getTestcaseList(parseInt(id ?? "-1"));
    if (responseTestcases) {
      setTestcases(responseTestcases ?? []);
    }

    Swal.close();
  };

  const onChangeValue = (value: string | null) => {
    if (value === null) return;
  };

  const openModal = () => {
    setIsOpenModal(true);
  };
  const closeModal = () => {
    setIsOpenModal(false);
    handleFetchData();
  };
  const reloadTestcases = () => {
    handleFetchData();
  };

  return (
    <div className={"w-full"}>
      <Header placeHolder={"Tìm kiếm"} isUsed={false} onChangeValue={onChangeValue} />

      <div className={"mx-12 my-10"}>
        <div className={"flex flex-row items-center justify-between"}>
          <p className={"text-xl font-semibold"}>Thông tin bài tập</p>
          <NavLink
            className={
              "px-4 py-2 duration-300 shadow-md bg-gray-300 hover:bg-gray-200 rounded-md text-base font-medium"
            }
            to={"/manage-problem"}
          >
            Quay lại
          </NavLink>
        </div>
        <form className={"w-full my-5"}>
          <div className={"mt-4 grid w-full gap-y-3 rounded-md bg-gray-100 p-3 shadow-md"}>
            <p className={"text-xl font-medium text-center"}>
              {problems && problems.length !== 0 ? problems[0].name : ""}
            </p>
            <div className={"w-full"}>
              <p className={"text-xl font-semibold"}>Đề bài</p>
              <p className={"whitespace-pre-line text-base font-normal"}>
                {problems && problems.length !== 0 ? problems[0].detail : ""}
              </p>
            </div>
            <div className={"flex w-full flex-col items-start gap-y-4"}>
              <div className={"w-full"}>
                <span className={"mb-2 block text-base font-medium font-semibold text-gray-900"}>Input mẫu</span>
                <p className={"whitespace-pre-line rounded-md border border-black p-3 text-base font-normal"}>
                  {problems && problems.length !== 0 ? problems[0].example_input : ""}
                </p>
              </div>
              <div className={"w-full"}>
                <span className={"mb-2 block text-base font-medium font-semibold text-gray-900"}>Output mẫu</span>
                <p className={"whitespace-pre-line rounded-md border border-black p-3 text-base font-normal"}>
                  {problems && problems.length !== 0 ? problems[0].example_output : ""}
                </p>
              </div>
            </div>
          </div>
        </form>
        <div className={"flex flex-row items-center justify-between"}>
          <p className={"text-xl font-semibold"}>Danh sách testcase</p>
          <button
            className={
              "px-4 py-2 duration-300 shadow-md bg-gray-300 hover:bg-gray-200 rounded-md text-base font-medium"
            }
            onClick={openModal}
          >
            Thêm testcase
          </button>
        </div>
        {testcases && testcases.length !== 0 ? (
          <ul className={"mt-5 grid gap-y-4"}>
            {testcases.map((testcase, index) => {
              return (
                <DetailTestcase
                  loadTestcases={reloadTestcases}
                  key={`testcase-${testcase.id}`}
                  stt={index}
                  testcase={testcase}
                />
              );
            })}
          </ul>
        ) : (
          <p className={"text-base font-normal mt-2"}>Chưa có testcase</p>
        )}
      </div>

      {isOpenModal && <AddTestcaseModal problem_id={parseInt(id ?? "-1")} closeModal={closeModal} />}
    </div>
  );
}

export default DetailProblem;
