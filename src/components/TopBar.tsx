import { useRef, type Dispatch, type SetStateAction } from "react";
import ToolButton from "../ui/ToolButton";
import Pen from "../assets/pen.svg?react";
import Eraser from "../assets/eraser.svg?react";

interface props {
  strokeWidthRef: React.RefObject<HTMLInputElement | null>;
  colorPickerRef: React.RefObject<HTMLInputElement | null>;
  setTool: Dispatch<SetStateAction<"brush" | "eraser">>;
  tool: "brush" | "eraser" | "";
  handleColorChange: () => void;
  handleStrokeChange: () => void;
  currentStroke: number;
}

const TopBar = ({
  strokeWidthRef,
  colorPickerRef,
  setTool,
  tool,
  handleColorChange,
  handleStrokeChange,
  currentStroke,
}: props) => {
  return (
    <div className="  w-full h-1/12 justify-center md:justify-start items-end py-2 rounded-xl md:p-3 gap-1 md:gap-5 flex flex-row ">
      <ToolButton
        tool="brush"
        currentTool={tool}
        setTool={setTool}
        label="Pincel"
      >
        <Pen
          width={23}
          height={23}
          className={`text-black group-hover:text-white ${
            tool == "brush" ? "text-white" : "text-black"
          }`}
        />
      </ToolButton>
      <ToolButton
        tool="eraser"
        currentTool={tool}
        setTool={setTool}
        label="Borrador"
      >
        <Eraser
          width={23}
          height={23}
          className={`text-black group-hover:text-white ${
            tool == "eraser" ? "text-white" : "text-black"
          }`}
        />
      </ToolButton>

      <div className="flex flex-col items-center ubuntu-bold text-sm md:text-base">
        <label htmlFor="picker">Color</label>
        <input
          ref={colorPickerRef}
          type="color"
          className="w-10 h-7 cursor-pointer bg-neutral-200   rounded-lg"
          name="picker"
          id="picker"
          onChange={handleColorChange}
        />
      </div>
      <div className="flex  flex-col ubuntu-bold  items-center text-sm md:text-base">
        <label htmlFor="stroke" className="">
          Radio
        </label>
        <input
          ref={strokeWidthRef}
          type="number"
          name="stroke"
          id="stroke"
          className="w-14 h-7 rounded-lg bg-neutral-200  focus:outline-[#47d1af]  text-center ubuntu-bold "
          onChange={handleStrokeChange}
          value={currentStroke}
          min="1"
          max="100"
        />
      </div>
    </div>
  );
};

export default TopBar;
