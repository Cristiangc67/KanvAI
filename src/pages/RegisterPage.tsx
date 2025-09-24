import { useAuth } from "../context/AuthContext";
import Mail from "../assets/mail.svg?react";
import Lock from "../assets/lock.svg?react";
import Google from "../assets/google.svg?react";
import Back from "../assets/back.svg?react";
import { useState } from "react";
import { Link } from "react-router";

export default function LoginPage() {
  const { signInWithGoogle, signUp } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorText, setErrorText] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const passwordsMatch = password === confirmPassword && password.length >= 6;

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorText(null);
    if (!passwordsMatch) {
      setErrorText("Las contraseñas no coinciden");
      return;
    }
    const { error } = await signUp(email, password);
    if (error) {
      setErrorText(error?.message);
    }
    setLoading(false);
  };

  return (
    <section className="  h-screen  flex flex-col bg-cover justify-center bg-[url(background.png)]">
      <div className=" relative h-[90vh] flex   container mx-auto justify-center  bg-linear-to-b from-neutral-300/70 to-[#47d1af] rounded-3xl shadow-2xl ">
        <Link
          to={"/"}
          className=" left-10 lg:left-15 xl:left-45 top-20 flex items-center absolute border h-fit border-black/60 rounded-full px-1 ubuntu-bold text-sm"
        >
          <Back className="w-8 h-8" />
          <span>Volver</span>
        </Link>

        <div className="p-5 flex justify-between  h-[90vh] w-full rounded-3xl items-center">
          <div className="w-full px-5 lg:px-10 xl:px-40">
            <h1 className="text-3xl ubuntu-bold mb-10">Registrarse</h1>
            <form
              className="flex flex-col gap-5 mb-5"
              action="POST"
              onSubmit={handleRegister}
            >
              <label
                htmlFor="email"
                className="flex gap-1 bg-neutral-200 px-2 py-1 rounded-2xl items-center"
              >
                <Mail className="w-6 h-6" />
                <div className="w-0.5 h-6 bg-black/50"></div>
                <input
                  className="rounded-2xl w-full px-2 josefin-sans-medium focus:outline-0"
                  value={email}
                  type="email"
                  name="email"
                  id="email"
                  placeholder="example@email.com"
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </label>
              <label className="flex gap-1 bg-neutral-200 px-2 py-1 rounded-2xl">
                <Lock className="w-6 h-6" />
                <div className="w-0.5 h-6 bg-black/50"></div>
                <input
                  className="rounded-2xl josefin-sans-medium w-full px-2 focus:outline-0"
                  value={password}
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Contraseña"
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={6}
                />
              </label>
              <label className="flex gap-1 bg-neutral-200 px-2 py-1 rounded-2xl">
                <Lock className="w-6 h-6" />
                <div className="w-0.5 h-6 bg-black/50"></div>
                <input
                  className="rounded-2xl josefin-sans-medium w-full px-2 focus:outline-0"
                  value={confirmPassword}
                  type="password"
                  name="confirmPassword"
                  id="confirmPassword"
                  placeholder="Confirmar Contraseña"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  minLength={6}
                />
              </label>
              {confirmPassword.length >= 0 && (
                <p
                  className={` w-fit px-4 py-1 rounded-full text-sm ${
                    passwordsMatch
                      ? "bg-emerald-200/80 border text-green-600"
                      : "text-red-600 bg-rose-300 border"
                  }`}
                >
                  {passwordsMatch
                    ? "✔️ Las contraseñas coinciden"
                    : "❌ Las contraseñas no coinciden"}
                </p>
              )}
              <button
                type="submit"
                disabled={loading || !passwordsMatch}
                className="bg-[#47d1af] border border-black/10 ubuntu-bold cursor-pointer w-full py-4 disabled:cursor-not-allowed text-white rounded-full p-2 disabled:bg-gray-400"
              >
                {loading ? "Registrando..." : "Registrarse"}
              </button>
            </form>
            {errorText && <p className="text-red-500">{errorText}</p>}
            <div className="flex items-center">
              <div className="w-1/2 h-[1px] bg-black/50"></div>
              <p className="ubuntu-bold"> O </p>
              <div className="w-1/2 h-[1px] bg-black/50"></div>
            </div>
            <button
              onClick={signInWithGoogle}
              className="flex mt-5 hover:bg-white items-end justify-center cursor-pointer gap-4 rounded-full border border-black w-full px-4 py-2"
            >
              <Google className="w-7 h-7" />
              <span className="josefin-sans-medium">Continuar con Google</span>
            </button>
            <p className="mt-10 text-center">
              Si ya tienes cuenta{" "}
              <Link className="ubuntu-bold text-[#2c8871]" to={"/login"}>
                Ingresa
              </Link>
            </p>
          </div>
          <div className="h-full w-full  justify-end hidden lg:flex">
            <img
              src="loginImage.png"
              className=" h-full w-fit rounded-3xl shadow-2xl"
              alt=""
            />
          </div>
        </div>
      </div>
    </section>
  );
}
