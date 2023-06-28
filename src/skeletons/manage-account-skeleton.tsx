function RowItem() {
  return (
    <div
      className={
        "w-full bg-gray-100 border border-t-0 border-solid border-gray-400 h-16 flex flex-row items-center justify-around"
      }
    >
      <div className={"w-16 bg-gray-400 h-6"}></div>
      <div className={"w-[450px] bg-gray-400 h-6"}></div>
      <div className={"w-32 bg-gray-400 h-6"}></div>
      <div className={"w-32 flex flex-row items-center justify-center gap-x-4"}>
        <div className={"h-10 w-10 bg-gray-400 rounded-md"}></div>
        <div className={"h-10 w-10 bg-gray-400 rounded-md"}></div>
      </div>
    </div>
  );
}

function ManageAccountSkeleton() {
  return (
    <div className={"mx-12 my-10"}>
      <div className={"w-full flex flex-row items-center animate-pulse justify-between"}>
        <div className={"w-44 bg-gray-200 rounded-full h-8"}></div>
        <div className={"w-36 bg-gray-200 rounded-full h-8"}></div>
      </div>
      <div className={"w-full mt-5 animate-pulse"}>
        <div className={"w-full bg-gray-400 h-12 flex flex-row items-center justify-around"}>
          <div className={"w-16 bg-gray-200 h-5"}></div>
          <div className={"w-[450px] bg-gray-200 h-5"}></div>
          <div className={"w-32 bg-gray-200 h-5"}></div>
          <div className={"w-32 bg-gray-200 h-5"}></div>
        </div>
        {[1, 2, 3, 4, 5, 6, 7, 8].map((item, index) => (
          <RowItem key={`table-row-${index}`} />
        ))}
      </div>
    </div>
  );
}

export { ManageAccountSkeleton };
