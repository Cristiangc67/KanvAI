//import Navbar from "../components/Navbar";
import { useEffect, useRef, useState } from "react";
import Canvas from "../components/Canvas";
import Output from "../components/Output";
import TopBar from "../components/TopBar";
import Generate from "../components/Generate";

import type { Stage } from "konva/lib/Stage";

const creation = () => {
  const [tool, setTool] = useState<"brush" | "eraser">("brush");
  const [error, setError] = useState<string | null>(null);
  const [currentColor, setCurrentColor] = useState("#000000");
  const [currentStroke, setCurrentStroke] = useState(5);
  const [outputLoading, setOutputLoading] = useState(false);
  const [base64, setBase64] = useState("");
  const [api, setApi] = useState(() => {
    return localStorage.getItem("geminiApiKey") || "";
  });

  useEffect(() => {
    if (api) {
      localStorage.setItem("geminiApiKey", api);
    }
  }, [api]);

  const colorPickerRef = useRef<HTMLInputElement>(null);
  const strokeWidthRef = useRef<HTMLInputElement>(null);
  const stageRef = useRef<Stage>(null);

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

  return (
    <div className=" h-full lg:h-screen relative z-10 lg:container mx-auto  pt-10 flex lg:flex-row flex-col gap-5 justify-center">
      <div className="lg:w-1/2 h-fit pb-10 px-4 flex flex-col items-center bg-neutral-50 rounded-3xl border border-black/20 shadow-2xl">
        <TopBar
          strokeWidthRef={strokeWidthRef}
          colorPickerRef={colorPickerRef}
          setTool={setTool}
          tool={tool}
          handleColorChange={handleColorChange}
          handleStrokeChange={handleStrokeChange}
          currentStroke={currentStroke}
        />

        <Canvas
          stageRef={stageRef}
          color={currentColor}
          stroke={currentStroke}
          tool={tool}
        />

        <Generate
          stageRef={stageRef}
          setOutputLoading={setOutputLoading}
          setBase64={setBase64}
          api={api}
          setApi={setApi}
          setError={setError}
        />
      </div>
      <Output base64={base64} outputLoading={outputLoading} error={error} />
    </div>
  );
};

export default creation;
