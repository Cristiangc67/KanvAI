import type { Part } from "@google/genai";
import { GoogleGenAI } from "@google/genai";
import type { Stage } from "konva/lib/Stage";
import { useState, type Dispatch, type SetStateAction } from "react";
import PromptModal from "../components/PromptModal";
interface props {
  stageRef: React.RefObject<Stage | null>;
  setOutputLoading: Dispatch<SetStateAction<boolean>>;
  setBase64: Dispatch<SetStateAction<string>>;
  api: string;
  setApi: Dispatch<SetStateAction<string>>;
  setError: Dispatch<SetStateAction<string | null>>;
}
const styles = [
  "generate a photorealistic image based on the image provided, aspect ratio 1:1",
  "generate a more complex anime image based on the image provided, aspect ratio 1:1",
];

const Generate = ({
  stageRef,
  setOutputLoading,
  setBase64,
  api,
  setApi,
  setError,
}: props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [style, setStyle] = useState(0);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  const handleExport = () => {
    const base64img = stageRef.current?.toDataURL().slice(22);
    if (!base64img) {
      console.error("Failed to generate image URI");
      return;
    }
    console.log(base64img);
    generateImage(base64img);
    closeModal();
  };
  const generateImage = async (base64img: string | undefined) => {
    const config = {
      responseModalities: ["IMAGE", "TEXT"],
    };
    const model = "gemini-2.0-flash-preview-image-generation";

    const contents: { role: string; parts: Part[] }[] = [
      {
        role: "user",
        parts: [
          {
            inlineData: {
              data: base64img,
              mimeType: `image/png`,
            },
          },
          {
            text: styles[style],
          },
        ],
      },
    ];

    const ai = new GoogleGenAI({
      apiKey: api,
    });

    try {
      setOutputLoading(true);
      const response = await ai.models.generateContent({
        model,
        config,
        contents,
      });

      const imagePart = response?.candidates?.[0]?.content?.parts?.find(
        (part) => !!part.inlineData
      );

      const base64Data = imagePart?.inlineData?.data ?? "";

      if (base64Data) {
        console.log("Image generated in Base64:", base64Data);
        setBase64(base64Data);
      } else {
        setError("No se encontro datos en la respuesta");
        console.error("No image data found in the response.");
      }
    } catch (error) {
      if (typeof error === "string") {
        setError(error);
        console.log("Error string:", error.toUpperCase());
      } else if (error instanceof Error) {
        setError(error.message);
        console.log("Error objeto:", error.message);
      }

      console.error("Error generating image:", error);
    } finally {
      setOutputLoading(false);
    }
  };

  return (
    <>
      {isModalOpen && (
        <PromptModal
          isOpen={isModalOpen}
          onClose={closeModal}
          handleExport={handleExport}
          setStyle={setStyle}
          style={style}
          setApi={setApi}
          api={api}
        />
      )}

      <button
        onClick={openModal}
        className="h-10 w-9/12 mt-5 cursor-pointer bg-black  hover:bg-[#47d1af] text-white   rounded-full ubuntu-bold wr "
      >
        Generar imagen
      </button>
    </>
  );
};

export default Generate;
