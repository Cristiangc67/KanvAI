import { Stage as ReactKonvaStage, Layer, Line, Rect } from "react-konva";
import { useState, useRef } from "react";
import Konva from "konva";
import type { Stage } from "konva/lib/Stage";

interface LineType {
  tool: "brush" | "eraser" | "";
  points: number[];
  color: string;
  strokeWidth: number;
}

interface props {
  tool: "brush" | "eraser" | "";
  color: string;
  stroke: number;
  stageRef: React.RefObject<Stage | null>;
}

const Canvas = ({ tool, color, stroke, stageRef }: props) => {
  const [lines, setLines] = useState<LineType[]>([]);

  const containerRef = useRef<HTMLDivElement>(null);
  const isDrawing = useRef(false);

  const handleMouseDown = (
    e: Konva.KonvaEventObject<MouseEvent | TouchEvent>
  ) => {
    isDrawing.current = true;
    const stage = e.target.getStage();
    if (!stage) return;

    const pos = stage.getPointerPosition();
    if (!pos) return;

    setLines([
      ...lines,
      {
        tool,
        points: [pos.x, pos.y],
        color: color,
        strokeWidth: stroke,
      },
    ]);
  };

  const handleMouseMove = (
    e: Konva.KonvaEventObject<MouseEvent | TouchEvent>
  ) => {
    if (!isDrawing.current) return;

    const stage = e.target.getStage();
    if (!stage) return;

    const point = stage.getPointerPosition();
    if (!point) return;

    if (lines.length === 0) return;

    const lastLine = lines[lines.length - 1];
    const newLines = [...lines];
    newLines.splice(lines.length - 1, 1, {
      ...lastLine,
      points: [...lastLine.points, point.x, point.y],
    });
    setLines(newLines);
  };

  const handleMouseUp = () => {
    isDrawing.current = false;
  };

  return (
    <div
      ref={containerRef}
      className=" aspect-square max-h-[73vh]  w-fit border border-gray-300 rounded-lg overflow-hidden flex justify-center items-center bg-white shadow-xl"
    >
      <ReactKonvaStage
        width={window.innerWidth}
        height={window.innerHeight}
        ref={stageRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onTouchStart={handleMouseDown}
        onTouchMove={handleMouseMove}
        onTouchEnd={handleMouseUp}
      >
        <Layer>
          <Rect
            x={0}
            y={0}
            width={window.innerWidth}
            height={window.innerHeight}
            fill="white"
            listening={false}
          />
          {lines.map((line, i) => (
            <Line
              key={i}
              points={line.points}
              stroke={line.color}
              strokeWidth={line.strokeWidth}
              tension={0.5}
              lineCap="round"
              lineJoin="round"
              globalCompositeOperation={
                line.tool === "eraser" ? "destination-out" : "source-over"
              }
            />
          ))}
        </Layer>
      </ReactKonvaStage>
    </div>
  );
};

export default Canvas;
