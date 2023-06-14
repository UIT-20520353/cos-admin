import { useSelector } from "react-redux";
import { RootState } from "~/store/store";
import { useRef } from "react";
import { CgProfile } from "react-icons/cg";

type IProps = {
  placeHolder: string;
  onChangeValue: (value: string | null) => void;
  isUsed: boolean;
};

function Header(props: IProps) {
  const inputSearchRef = useRef<HTMLInputElement>(null);
  const user = useSelector((state: RootState) => state.user);

  const handleOnChange = () => {
    if (!inputSearchRef.current) return;
    if (props.isUsed) props.onChangeValue(inputSearchRef.current.value);
    else props.onChangeValue(null);
  };

  return (
    <div
      className={
        "flex h-16 w-full flex-row items-center justify-between border-b border-gray-200 bg-[#efefef] px-8 shadow-md sticky top-0"
      }
    >
      <div>
        <input
          ref={inputSearchRef}
          type="text"
          className={
            "min-h-[50px] w-80 rounded-full border border-solid border-[#5e4dcd] bg-transparent px-4 py-0 text-[15px] text-black focus:border-[#3898EC] focus:outline-none"
          }
          onChange={handleOnChange}
          placeholder={props.placeHolder}
        />
      </div>
      <div className={"flex cursor-pointer flex-row items-center gap-x-4"}>
        <span className={"font-mono text-lg font-bold"}>{user.name}</span>
        <div className={"relative"}>
          <button type={"button"}>
            <CgProfile className={"h-10 w-10 cursor-pointer opacity-60 duration-300 hover:opacity-100"} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Header;
