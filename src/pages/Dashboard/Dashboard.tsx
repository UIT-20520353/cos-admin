import { useEffect } from "react";
import Header from "../../components/Header";
import Rankings from "~/components/Rankings";
import Notification from "~/components/Notification";

type INotification = {
  id: number;
  title: string;
  nameHost: string;
  date: string;
};

type IData = {
  rank: number;
  name: string;
  point: number | string;
};

type ITableHeader = {
  col1: string;
  col2: string;
  col3: string;
};

const dataContestRankings: IData[] = [
  {
    rank: 1,
    name: "Beginner Free Contest 51",
    point: 86
  },
  {
    rank: 2,
    name: "We code",
    point: 56
  },
  {
    rank: 3,
    name: "Testing Round 49",
    point: 50
  }
];

const notifications: INotification[] = [
  {
    id: 1,
    title: "Thi học sinh giỏi tin học cấp tỉnh Ninh Thuận",
    nameHost: "Trường trung học phổ thông chuyên Lê Quý Đôn",
    date: "12/03/2023"
  },
  {
    id: 2,
    title: "Thi học sinh giỏi tin học cấp quốc gia",
    nameHost: "Bộ giáo dục",
    date: "30/04/2023"
  },
  {
    id: 3,
    title: "Testing Round 49",
    nameHost: "Free contest",
    date: "06/05/2023"
  },
  {
    id: 4,
    title: "Beginner Free Contest 51",
    nameHost: "Free contest",
    date: "15/04/2023"
  }
];

const contestRankingHeader: ITableHeader = {
  col1: "Hạng",
  col2: "Tên cuộc thi",
  col3: "SỐ THÍ SINH"
};

function Dashboard() {
  useEffect(() => {
    document.title = "Trang chủ";
  }, []);

  const onChangeValue = (value: string | null) => {
    if (value === null) return;
  };

  return (
    <div className={"w-full"}>
      <Header placeHolder={"Tìm kiếm"} isUsed={false} onChangeValue={onChangeValue} />

      <div className={"mx-5 my-8 flex flex-row items-start gap-x-5"}>
        <div className={"flex-1 rounded-md border border-gray-200 bg-gray-100 shadow-md"}>
          <p className={"pl-3 pt-3 text-2xl font-bold"}>Thông báo</p>

          <ul>
            {notifications.map((notification) => {
              return (
                <li key={notification.id}>
                  <Notification title={notification.title} nameHost={notification.nameHost} date={notification.date} />
                </li>
              );
            })}
          </ul>
        </div>

        <div className={"flex w-[35%] flex-col items-center gap-y-5"}>
          <Rankings
            tableTitle={"Bảng xếp hạng các cuộc thi"}
            tableData={dataContestRankings}
            tableHeader={contestRankingHeader}
          />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
