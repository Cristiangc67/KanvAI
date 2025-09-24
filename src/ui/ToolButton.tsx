import type { Dispatch, PropsWithChildren, SetStateAction } from "react";

interface ToolButtonProps {
  tool: string;
  currentTool: string;
  setTool: Dispatch<SetStateAction<"brush" | "eraser">>;
  label?: string;
  isIconOnly?: boolean;
}

const ToolButton: React.FC<PropsWithChildren<ToolButtonProps>> = ({
  tool,
  currentTool,
  setTool,
  label,
  isIconOnly = false,
  children,
}) => {
  return (
    <button
      onClick={() => setTool(tool as "brush" | "eraser")}
      className={`group cursor-pointer justify-center items-center ${
        currentTool == tool ? "bg-black " : "bg-white"
      } hover:bg-[#47d1af] h-fit rounded-full flex px-3 py-1 ${
        isIconOnly ? "w-10 md:w-14 h-14 rounded-lg justify-center" : ""
      }`}
    >
      {children}

      {label && (
        <span
          className={`ubuntu-bold ms-2 group-hover:text-white text-xs md:text-sm ${
            currentTool == tool ? "text-white" : "text-black"
          }`}
        >
          {label}
        </span>
      )}
    </button>
  );
};

export default ToolButton;
