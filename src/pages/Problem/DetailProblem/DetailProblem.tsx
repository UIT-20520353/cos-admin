import { NavLink, useParams } from "react-router-dom";
import { useState } from "react";
import { getProblemById } from "~/queries/api/problem-service";
import { getTestcaseList } from "~/queries/api/testcase-service";
import DetailTestcase from "~/components/Testcase/DetailTestcase";
import AddTestcaseModal from "~/components/Modal/AddTestcaseModal";
import { Header } from "~/components";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { DetailProblemSkeleton } from "~/skeletons";

function DetailProblem() {
  const queryClient = useQueryClient();
  const { id } = useParams<{ id: string }>();
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);

  const { data: problem, isLoading: problemLoading } = useQuery({
    queryKey: ["manage-problem", "problem", Number(id) ?? -1],
    queryFn: () => {
      return getProblemById(Number(id) ?? -1);
    }
  });

  const { data: testcases, isLoading: testcaseLoading } = useQuery({
    queryKey: ["manage-problem", "testcase-list"],
    queryFn: () => {
      return getTestcaseList(Number(id) ?? -1);
    }
  });

  const onChangeValue = (value: string | null) => {
    if (value === null) return;
  };

  const openModal = () => {
    setIsOpenModal(true);
  };
  const closeModal = () => {
    setIsOpenModal(false);
    queryClient.invalidateQueries({ queryKey: ["manage-problem", "testcase-list"] });
  };
  const reloadTestcases = () => {
    queryClient.invalidateQueries({ queryKey: ["manage-problem", "testcase-list"] });
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

        {(problemLoading || testcaseLoading) && <DetailProblemSkeleton />}
        {!problemLoading && !testcaseLoading && (
          <>
            <form className={"w-full my-5"}>
              <div className={"mt-4 grid w-full gap-y-3 rounded-md bg-gray-100 p-3 shadow-md"}>
                <p className={"text-xl font-medium text-center"}>{problem?.name}</p>
                <div className={"w-full"}>
                  <p className={"text-xl font-semibold"}>Đề bài</p>
                  <p className={"whitespace-pre-line text-base font-normal"}>{problem?.detail}</p>
                </div>
                <div className={"flex w-full flex-col items-start gap-y-4"}>
                  <div className={"w-full"}>
                    <span className={"mb-2 block text-base font-medium font-semibold text-gray-900"}>Input mẫu</span>
                    <p className={"whitespace-pre-line rounded-md border border-black p-3 text-base font-normal"}>
                      {problem?.example_input}
                    </p>
                  </div>
                  <div className={"w-full"}>
                    <span className={"mb-2 block text-base font-medium font-semibold text-gray-900"}>Output mẫu</span>
                    <p className={"whitespace-pre-line rounded-md border border-black p-3 text-base font-normal"}>
                      {problem?.example_output}
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
          </>
        )}
      </div>

      {isOpenModal && <AddTestcaseModal problem_id={parseInt(id ?? "-1")} closeModal={closeModal} />}
    </div>
  );
}

export default DetailProblem;
