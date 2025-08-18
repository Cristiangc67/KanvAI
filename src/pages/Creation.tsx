//import Navbar from "../components/Navbar";
import { useRef, useState } from "react";
import Canvas from "../components/Canvas";
import Output from "../components/Output";

const creation = () => {
  const [tool, setTool] = useState<"brush" | "eraser">("brush");
  const [currentColor, setCurrentColor] = useState("#000000");
  const [currentStroke, setCurrentStroke] = useState(5);
  const colorPickerRef = useRef<HTMLInputElement>(null);
  const strokeWidthRef = useRef<HTMLInputElement>(null);

  const handleColorChange = () => {
    if (colorPickerRef.current) {
      setCurrentColor(colorPickerRef.current.value);
    }
  };
  const handleStrokeChange = () => {
    if (strokeWidthRef.current) {
      setCurrentStroke(parseInt(strokeWidthRef.current.value));
    }
  };
  const handleUndo = () => {
    if (strokeWidthRef.current) {
      setCurrentStroke(parseInt(strokeWidthRef.current.value));
    }
  };

  return (
    <div className="h-screen w-screen bg-cyan-500 pt-30 flex">
      <div className="bg-[#C6ECEA] w-1/12 h-5/6 ms-20 rounded-xl p-5 gap-5 flex flex-col">
        <button
          onClick={() => setTool("brush")}
          className={`cursor-pointer  ${
            tool == "brush" ? "bg-[#8eaeac]" : "bg-[#accfcd]"
          } hover:bg-[#8eaeac] w-14 h-14 rounded-lg`}
        >
          <img src="/brush.svg" alt="pincel" />
        </button>
        <button
          onClick={() => setTool("eraser")}
          className={`cursor-pointer ${
            tool == "eraser" ? "bg-[#8eaeac]" : "bg-[#accfcd]"
          }  hover:bg-[#8eaeac] w-14 h-14 rounded-lg`}
        >
          <img src="/eraser.svg" alt="borrador" />
        </button>

        <input
          ref={colorPickerRef}
          type="color"
          className="w-14 h-14 cursor-pointer bg-[#accfcd] hover:bg-[#8eaeac] rounded-lg"
          name="picker"
          id="picker"
          onChange={handleColorChange}
        />
        <div className="flex flex-col text-center w-fit">
          <input
            ref={strokeWidthRef}
            type="number"
            name="stroke"
            id="stroke"
            className="w-14 h-14 bg-[#accfcd] text-center ubuntu-bold "
            onChange={handleStrokeChange}
            value={currentStroke}
            min="1"
            max="100"
          />
          <span className="ubuntu-bold">Radio</span>
        </div>
        <select name="" id="">
          <option value=""></option>
          <option value=""></option>
        </select>
      </div>

      <Canvas color={currentColor} stroke={currentStroke} tool={tool} />
      <Output />
    </div>
  );
};

export default creation;
