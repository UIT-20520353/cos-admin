import { CgProfile } from "react-icons/cg";
import { SubmitHandler, useForm } from "react-hook-form";

type IProps = {
  placeHolder: string;
  onChangeValue: (value: string | null) => void;
  isUsed: boolean;
};

interface HeaderState {
  searchText: string;
}

function Header(props: IProps) {
  const { register, handleSubmit } = useForm<HeaderState>();

  const onSubmit: SubmitHandler<HeaderState> = (data) => {
    if (props.isUsed) props.onChangeValue(data.searchText);
    else props.onChangeValue(null);
  };

  return (
    <div
      className={
        "flex h-16 w-full z-20 flex-row items-center justify-between border-b border-gray-200 bg-[#efefef] px-8 shadow-md sticky top-0"
      }
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="text"
          className={
            "min-h-[50px] w-80 rounded-full border border-solid border-[#5e4dcd] bg-transparent px-4 py-0 text-[15px] text-black focus:border-[#3898EC] focus:outline-none"
          }
          placeholder={props.placeHolder}
          autoComplete={"off"}
          {...register("searchText")}
        />
      </form>
      <div className={"flex cursor-pointer flex-row items-center gap-x-4"}>
        <span className={"font-mono text-lg font-bold"}>{sessionStorage.getItem("name")}</span>
        <div className={"relative"}>
          <button type={"button"}>
            <CgProfile className={"h-10 w-10 opacity-60 duration-300 hover:opacity-100"} />
          </button>
        </div>
      </div>
    </div>
  );
}

export { Header };
