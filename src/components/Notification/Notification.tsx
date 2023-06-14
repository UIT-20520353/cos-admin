type IProps = {
  title: string;
  nameHost: string;
  date: string;
};

function Notification(props: IProps) {
  return (
    <div className={"p-3"}>
      <p className={"cursor-pointer text-2xl font-medium text-blue-950 hover:text-blue-800"}>{props.title}</p>
      <p className={"text-xl"}>
        <span className={"cursor-pointer text-amber-500 hover:text-amber-700"}>{props.nameHost}</span>, ngày{" "}
        {props.date}
      </p>
    </div>
  );
}

export default Notification;
