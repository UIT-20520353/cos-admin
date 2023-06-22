import { useEffect, useState } from "react";
import Header from "../../components/Header";
import Swal from "sweetalert2";
import { getContestListDashboard, getContestsForRanking } from "~/queries/api/contest-service";
import { IContestDashboard, IContestForRanking } from "~/types/contest.type";
import { getDateAndTime } from "~/utils/ValidateDate";

type IProps = {
  contest: IContestDashboard;
  dateDisplay: string;
};

function Notification(props: IProps) {
  return (
    <div className={"w-full"}>
      <p className={"text-xl font-medium text-blue-950"}>{props.contest.name}</p>
      <p className={"text-lg"}>
        <span className={"text-black"}>{props.contest.host_name}</span>, ngày {props.dateDisplay}
      </p>
    </div>
  );
}

function RowItem(props: { row: IContestForRanking; stt: number }) {
  return (
    <tr className="border border-black bg-stone-200">
      <th scope="row" className="whitespace-nowrap px-6 py-4 font-medium text-gray-900">
        {props.stt + 1}
      </th>
      <td className="px-6 py-4">{props.row.name}</td>
      <td className="px-6 py-4">{props.row.amount}</td>
    </tr>
  );
}

function Dashboard() {
  const [contests, setContests] = useState<IContestDashboard[]>([]);
  const [rankings, setRankings] = useState<IContestForRanking[]>([]);

  useEffect(() => {
    document.title = "Trang chủ";
    handleFetchData();
  }, []);

  const handleFetchData = async () => {
    Swal.fire({
      title: "Đang lấy dữ liệu",
      allowOutsideClick: false,
      showConfirmButton: false,
      didOpen() {
        Swal.showLoading();
      }
    });

    const dataContests = await getContestListDashboard();
    if (dataContests && dataContests.length !== 0) setContests(dataContests ?? []);
    const dataRanking = await getContestsForRanking();
    if (dataRanking && dataRanking.length !== 0) {
      dataRanking.sort((a, b) => b.amount - a.amount);
      setRankings(dataRanking ?? []);
    }
    Swal.close();
  };

  const onChangeValue = (value: string | null) => {
    if (value === null) return;
  };

  return (
    <div className={"w-full"}>
      <Header placeHolder={"Tìm kiếm"} isUsed={false} onChangeValue={onChangeValue} />

      <div className={"mx-5 my-8 flex flex-row items-start gap-x-5"}>
        <div className={"flex w-3/5 flex-col items-start gap-y-7"}>
          <p className={"-mb-2 text-2xl font-medium"}>Các cuộc thi sắp diễn ra</p>
          {contests.map((contest) => {
            const current_date = new Date();
            const { year, month, day, hour, minute, second } = getDateAndTime(contest.date_begin, contest.time_begin);

            const time_begin = new Date(year, month, day, hour, minute, second);
            if (time_begin > current_date)
              return (
                <Notification
                  dateDisplay={`${day}/${month + 1}/${year}`}
                  key={`notification-${contest.id}`}
                  contest={contest}
                />
              );
          })}
        </div>

        <div className={"flex flex-1 flex-col items-center gap-y-5"}>
          <div className={"w-full rounded-md border-gray-300 bg-gray-200 p-3 shadow-md"}>
            <p className={"text-xl font-semibold text-blue-950"}>Bảng xếp hạng các cuộc thi</p>

            <div className="overflow-x-auto">
              <table className="mt-3 w-full text-left text-sm text-gray-500">
                <thead className="border border-black bg-stone-100 text-xs uppercase text-gray-700">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      Hạng
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Tên cuộc thi
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Số đội tham gia
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {rankings.map((ranking, index) => (
                    <RowItem row={ranking} stt={index} key={`ranking-${ranking.id}`} />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
