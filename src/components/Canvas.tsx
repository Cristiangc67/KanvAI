import { Stage, Layer, Line, Text } from "react-konva";
import { useState, useRef, useEffect } from "react";
import Konva from "konva";

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
}

const Canvas = ({ tool, color, stroke }: props) => {
  const [lines, setLines] = useState<LineType[]>([]);
  const [canvasSize, setCanvasSize] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDrawing = useRef(false);

  useEffect(() => {
    const updateSize = () => {
      if (containerRef.current) {
        const size = Math.min(
          containerRef.current.offsetWidth,
          containerRef.current.offsetHeight || containerRef.current.offsetWidth
        );
        setCanvasSize(size);
      }
    };

    updateSize();

    const resizeObserver = new ResizeObserver(updateSize);
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    return () => resizeObserver.disconnect();
  }, []);

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
      className=" aspect-square max-h-[73vh] ms-10 w-fit border border-gray-300 rounded-lg overflow-hidden flex justify-center items-center bg-gray-100"
    >
      <Stage
        width={canvasSize}
        height={canvasSize}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onTouchStart={handleMouseDown}
        onTouchMove={handleMouseMove}
        onTouchEnd={handleMouseUp}
      >
        <Layer>
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
      </Stage>
    </div>
  );
};

export default Canvas;
