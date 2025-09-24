import Download from "../assets/download.svg?react";

interface prop {
  base64: string;
  outputLoading: boolean;
  error: string | null;
}

const Output = ({ base64, outputLoading, error }: prop) => {
  function downloadURI(uri: string, name: string) {
    const link = document.createElement("a");
    link.download = name;
    link.href = uri;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  return (
    <div className=" lg:w-1/2 h-fit pb-10 px-4  flex flex-col bg-neutral-50 text-start border border-black/20 rounded-3xl shadow-2xl">
      <h2 className=" py-5 text-2xl block ubuntu-bold ms-6">Resultado</h2>
      <div
        className={`aspect-square relative h-auto w-full   border border-neutral-800 rounded-lg overflow-hidden items-center flex ${
          outputLoading ? "animate-pulse" : ""
        } bg-zinc-600`}
      >
        {base64 !== "" && (
          <>
            <button
              onClick={() =>
                downloadURI(`data:image/png;base64,${base64}`, "download.png")
              }
              className="w-10 h-10 rounded-full cursor-pointer absolute top-2 right-2 z-10"
            >
              <Download className="w-10 h-10  rounded-full" />
            </button>
            <img
              src={`data:image/png;base64,${base64}`}
              className=" w-full"
              alt=""
            />
          </>
        )}
        {error !== null && (
          <div className="text-red-600 bg-rose-300 border px-5  mx-auto">
            {error}
          </div>
        )}
      </div>
    </div>
  );
};

export default Output;
