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
  setApi: Dispatch<SetStateAction<string>>;
}

const TopBar = ({
  strokeWidthRef,
  colorPickerRef,
  setTool,
  tool,
  handleColorChange,
  handleStrokeChange,
  currentStroke,
  setApi,
}: props) => {
  const apiRef = useRef<HTMLInputElement>(null);

  const handleApi = () => {
    const apiValue = apiRef.current?.value;
    if (!apiValue) return console.log("Error en api key");
    setApi(apiValue);
  };

  return (
    <div className=" w-full h-1/12 justify-center  rounded-xl p-5 gap-5 flex flex-row items-center">
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

      <div className="flex items-center gap-2 ubuntu-bold">
        <label htmlFor="picker">Color</label>
        <input
          ref={colorPickerRef}
          type="color"
          className="w-10 h-7 cursor-pointer bg-[#47d1af]  rounded-lg"
          name="picker"
          id="picker"
          onChange={handleColorChange}
        />
      </div>
      <div className="flex flex-row text-center gap-2 items-center w-fit">
        <label htmlFor="stroke" className="ubuntu-bold">
          Radio
        </label>
        <input
          ref={strokeWidthRef}
          type="number"
          name="stroke"
          id="stroke"
          className="w-14 h-7 rounded-lg bg-[#47d1af] text-center ubuntu-bold "
          onChange={handleStrokeChange}
          value={currentStroke}
          min="1"
          max="100"
        />
      </div>

      <div className="flex gap-2 items-center">
        <label htmlFor="provider" className=" ubuntu-bold">
          Gemini key
        </label>
        <input
          type="text"
          onChange={handleApi}
          ref={apiRef}
          className="bg-neutral-300 rounded-lg"
        />
      </div>
    </div>
  );
};

export default TopBar;
