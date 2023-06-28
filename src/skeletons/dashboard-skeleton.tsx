import "./styles.css";

function DashboardSkeleton() {
  return (
    <div className={"mx-5 my-8 flex flex-row items-start gap-x-5"}>
      <div className={"flex w-3/5 flex-col items-start gap-y-5"}>
        <div className={"w-72 h-7 bg-gray-300 animate-pulse rounded-full"} />
        <div className={"space-y-1 animate-pulse animation-delay-500 rounded-full"}>
          <div className={"w-40 h-5 bg-gray-300 rounded-full"} />
          <div className={"w-96 h-5 bg-gray-300 rounded-full"} />
        </div>
        <div className={"space-y-1 animate-pulse"}>
          <div className={"w-40 h-5 bg-gray-300 rounded-full"} />
          <div className={"w-96 h-5 bg-gray-300 rounded-full"} />
        </div>
        <div className={"space-y-1 animate-pulse animation-delay-500"}>
          <div className={"w-40 h-5 bg-gray-300 rounded-full"} />
          <div className={"w-96 h-5 bg-gray-300 rounded-full"} />
        </div>
      </div>
      <div className={"flex flex-1 flex-col items-start gap-y-5"}>
        <div className={"p-3 bg-gray-100 rounded-md w-full space-y-2"}>
          <div className={"w-72 h-7 bg-gray-300 animate-pulse rounded-full"} />
          <div className={"w-full grid grid-cols-4 space-x-2 h-6"}>
            <div className={"bg-gray-300 animate-pulse rounded-full"}></div>
            <div className={"col-span-2 bg-gray-300 animate-pulse animation-delay-500 rounded-full"}></div>
            <div className={"bg-gray-300 animate-pulse rounded-full"}></div>
          </div>
          <div className={"w-full grid grid-cols-4 space-x-2 h-6"}>
            <div className={"bg-gray-300 animate-pulse animation-delay-500 rounded-full"}></div>
            <div className={"col-span-2 bg-gray-300 animate-pulse rounded-full"}></div>
            <div className={"bg-gray-300 animate-pulse animation-delay-500 rounded-full"}></div>
          </div>
          <div className={"w-full grid grid-cols-4 space-x-2 h-6"}>
            <div className={"bg-gray-300 animate-pulse rounded-full"}></div>
            <div className={"col-span-2 bg-gray-300 animate-pulse animation-delay-500 rounded-full"}></div>
            <div className={"bg-gray-300 animate-pulse rounded-full"}></div>
          </div>
          <div className={"w-full grid grid-cols-4 space-x-2 h-6"}>
            <div className={"bg-gray-300 animate-pulse animation-delay-500 rounded-full"}></div>
            <div className={"col-span-2 bg-gray-300 animate-pulse rounded-full"}></div>
            <div className={"bg-gray-300 animate-pulse animation-delay-500 rounded-full"}></div>
          </div>
          <div className={"w-full grid grid-cols-4 space-x-2 h-6"}>
            <div className={"bg-gray-300 animate-pulse rounded-full"}></div>
            <div className={"col-span-2 bg-gray-300 animate-pulse animation-delay-500 rounded-full"}></div>
            <div className={"bg-gray-300 animate-pulse rounded-full"}></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export { DashboardSkeleton };
