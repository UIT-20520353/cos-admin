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

type IProps = {
  tableTitle: string;
  tableData: IData[];
  tableHeader: ITableHeader;
};

function Rankings(props: IProps) {
  return (
    <div className={"w-full rounded-md border-gray-300 bg-gray-200 p-3 shadow-md"}>
      <p className={"text-xl font-semibold text-blue-950"}>{props.tableTitle}</p>

      <div className="overflow-x-auto">
        <table className="mt-3 w-full text-left text-sm text-gray-500">
          <thead className="border border-black bg-stone-100 text-xs uppercase text-gray-700">
            <tr>
              <th scope="col" className="px-6 py-3">
                {props.tableHeader.col1}
              </th>
              <th scope="col" className="px-6 py-3">
                {props.tableHeader.col2}
              </th>
              <th scope="col" className="px-6 py-3">
                {props.tableHeader.col3}
              </th>
            </tr>
          </thead>
          <tbody>
            {props.tableData.map((row) => {
              return (
                <tr key={row.rank} className="border border-black bg-stone-200">
                  <th scope="row" className="whitespace-nowrap px-6 py-4 font-medium text-gray-900">
                    {row.rank}
                  </th>
                  <td className="cursor-pointer px-6 py-4 hover:text-black">{row.name}</td>
                  <td className="px-6 py-4">{row.point}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Rankings;
