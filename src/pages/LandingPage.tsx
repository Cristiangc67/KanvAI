const LandingPage = () => {
  return (
    <main className=" h-full mx-auto ">
      <section className="container relative h-[90vh] overflow-hidden  mx-auto">
        <h1 className="text-center text-6xl ubuntu-bold mt-10 h-fit">
          Imagina, dibuja <br />y{" "}
          <span className="bg-gradient-to-r text-transparent bg-clip-text  from-[#47d1af] to-[#349a80]">
            transforma
          </span>{" "}
          tus ideas.
        </h1>
        <div className="flex mx-auto w-fit h-full mt-20  gap-10">
          <div className="w-20 h-20 rotate-12 animate-bounce hidden lg:block rounded-2xl  bg-[#47d1af]" />
          <img src="/hero.png" className="rounded-3xl h-full" alt="" />
          <div className="w-20 h-20 -rotate-12 animate-bounce hidden lg:block rounded-2xl  bg-[#47d1af]" />
        </div>
        <div className="w-screen h-40 absolute bottom-0 bg-gradient-to-b from-transparent to-white"></div>
      </section>
      <section className="w-screen"> sdasdsadas</section>
    </main>
  );
};

export default LandingPage;
