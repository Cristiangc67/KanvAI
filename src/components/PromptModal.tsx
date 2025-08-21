import { useEffect, useRef, type Dispatch, type SetStateAction } from "react";
import { createPortal } from "react-dom";

interface props {
  isOpen: boolean;
  onClose: () => void;
  handleExport: () => void;
  setStyle: Dispatch<SetStateAction<number>>;
  style: number;
}

const PromptModal = ({
  isOpen,
  onClose,
  handleExport,
  setStyle,
  style,
}: props) => {
  const selectRef = useRef<HTMLSelectElement>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const modalRoot = document.getElementById("modal");

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen) {
      dialog.showModal();
    } else {
      dialog.close();
    }
  }, [isOpen]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (e.target === dialog) {
        onClose();
      }
    };

    dialog.addEventListener("click", handleClickOutside);
    return () => dialog.removeEventListener("click", handleClickOutside);
  }, [onClose]);
  useEffect(() => {
    if (selectRef.current) {
      selectRef.current.value = style.toString();
    }
  }, [style, isOpen]);

  if (!modalRoot || !isOpen) {
    return null;
  }

  const handleChange = () => {
    const actualValue = selectRef.current?.value;
    if (!actualValue) return console.log("error");
    const parsedValue = parseInt(actualValue);
    setStyle(parsedValue);
  };

  return createPortal(
    <dialog
      ref={dialogRef}
      className="rounded-lg p-8 mx-auto my-auto bg-gradient-to-b from-emerald-500 to-emerald-800 backdrop:bg-[#0000007c] flex flex-col gap-10 justify-center items-center"
      onClose={onClose}
    >
      <div>
        <h2 className="text-2xl ubuntu-bold">Seleccionar el estilo</h2>
        <div className="w-full h-0.5 bg-black/50"></div>
      </div>
      <select
        ref={selectRef}
        className="bg-white rounded-full px-4 py-2"
        onChange={handleChange}
        name=""
        id=""
      >
        <option value="0">Fotorealista</option>
        <option value="1">Anime</option>
      </select>
      <div className="flex gap-10">
        <button
          onClick={onClose}
          className="rounded-full cursor-pointer px-4 border border-black hover:bg-white"
        >
          Cerrar
        </button>
        <button
          onClick={handleExport}
          className="rounded-full cursor-pointer border border-black hover:border-white px-4 bg-black hover:bg-white text-white hover:text-black ubuntu-bold"
        >
          Generar
        </button>
      </div>
    </dialog>,
    modalRoot
  );
};

export default PromptModal;
