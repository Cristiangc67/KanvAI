import { useEffect, useRef, useState } from "react";
import { useAuth } from "../context/AuthContext";
import supabase from "../supabase-client.ts";
import Spinner from "../assets/tube-spinner.svg?react";
import Check from "../assets/check-circle.svg?react";
import Close from "../assets/close-circle.svg?react";
import Upload from "../assets/upload.svg?react";
import { useNavigate } from "react-router";

/* interface Profile {
  id: string;
  username: string | null;
  avatar_url: string | null;
  created_at: string;
  description: string;
} */

const ProfileEditPage = () => {
  const { profile, loadProfile } = useAuth();
  const [username, setUsername] = useState(profile?.username || "");
  const [description, setDescription] = useState(profile?.description || "");
  const [isCheckingUsername, setIsCheckingUsername] = useState(false);
  const [isUsernameValid, setIsUsernameValid] = useState(true);
  const [initialUsername, setInitialUsername] = useState(profile?.username);
  const [errorMessage, setErrorMessage] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [profilePicture, setProfilePicture] = useState(
    profile?.avatar_url || null
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");

  const debounceTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (username === initialUsername) {
      setIsUsernameValid(true);
      setErrorMessage("");
      setIsCheckingUsername(false);
      return;
    }
    if (username === "") {
      setIsUsernameValid(false);
      setErrorMessage("vacio");
      setIsCheckingUsername(false);
      return;
    }

    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current);
    }

    setIsCheckingUsername(true);

    debounceTimeoutRef.current = setTimeout(async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("username")
        .eq("username", username)
        .single();
      console.log(data, error);

      if (data) {
        setIsUsernameValid(false);
        console.log(data, error);
        setErrorMessage("Nombre de usuario ya en uso");
      } else {
        setIsUsernameValid(true);
        setErrorMessage("");
      }
      setIsCheckingUsername(false);
    }, 3000);
  }, [username, initialUsername]);

  useEffect(() => {
    if (profile) {
      setUsername(profile.username || "");
      setDescription(profile.description || "");
      setInitialUsername(profile.username || "");
      setProfilePicture(profile.avatar_url);
    }
  }, [profile]);

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handleDescriptionChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setDescription(e.target.value);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      return;
    }

    const file = e.target.files[0];

    if (file) {
      setImage(file);
      setProfilePicture(URL.createObjectURL(file));
    } else {
      setImage(null);
      setProfilePicture(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage("");

    if (isCheckingUsername || !isUsernameValid) {
      setSubmitMessage("Por favor, verifica el nombre de usuario");
      setIsSubmitting(false);
      return;
    }

    try {
      if (!profile) {
        setSubmitMessage("Error: No hay perfil disponible");
        setIsSubmitting(false);
        return;
      }

      let avatarUrl = profile.avatar_url;

      if (image) {
        const filePath = `${profile.id}/${profile.id}.png`;
        const { error: uploadError } = await supabase.storage
          .from("avatars")
          .upload(filePath, image, { upsert: true });

        if (uploadError) {
          setSubmitMessage("Error al subir la imagen");
          setIsSubmitting(false);
          return;
        }

        const { data: publicUrlData } = supabase.storage
          .from("avatars")
          .getPublicUrl(filePath);

        avatarUrl = publicUrlData?.publicUrl || profile.avatar_url;
      }

      const { error: updateError } = await supabase
        .from("profiles")
        .update({
          avatar_url: avatarUrl,
          username: username,
          description: description,
        })
        .eq("id", profile.id);

      if (updateError) {
        setSubmitMessage(
          "Error al actualizar el perfil: " + updateError.message
        );
      } else {
        setSubmitMessage("Perfil actualizado con éxito");

        if (loadProfile) {
          if (typeof window !== "undefined") {
            localStorage.removeItem("profile_data");
          }

          await new Promise((resolve) => setTimeout(resolve, 500));

          await loadProfile(profile.id);

          if (profile) {
            setUsername(profile.username || "");
            setDescription(profile.description || "");
          }
        }

        setTimeout(() => {
          navigate(`/user/${profile.id}`);
        }, 2000);
      }
    } catch (error) {
      setSubmitMessage("Error inesperado: " + (error as Error).message);
      console.error("Error general:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="container mx-auto px-4 py-8 max-w-4xl">
      <form onSubmit={handleSubmit} className="flex-col flex items-center">
        <div className="relative  w-fit mx-auto">
          <div className="w-50 aspect-square rounded-full overflow-hidden">
            <img
              src={profilePicture ? profilePicture : "/usericon.png"}
              alt=""
              className="w-full rounded-full relative"
            />
          </div>
          <label
            className="absolute cursor-pointer opacity-0 hover:opacity-100 transition-all duration-200 top-1/2 left-1/2 -translate-1/2 w-50 h-50 bg-gray-500/60 rounded-full"
            htmlFor="profilePhoto"
          >
            <Upload className="w-50 h-50 p-10 rounded-full stroke-white" />
          </label>
          <input
            id="profilePhoto"
            className="hidden"
            type="file"
            accept="image/png"
            onChange={handleFileChange}
          />
        </div>
        <div className="flex flex-col mt-10 gap-4 items-center w-fit mx-auto">
          <label className="ubuntu-bold" htmlFor="username">
            Nombre de usuario
          </label>
          <div className="flex flex-col relative">
            <input
              id="username"
              type="text"
              value={username}
              onChange={handleUsernameChange}
              className="border border-[#47D1AF]/50 bg-[#47D1AF]/20 rounded-lg px-2 py-1"
            />
            <p className="text-xs text-red-900 absolute top-full">
              {errorMessage}
            </p>
          </div>
          {isCheckingUsername ? (
            <Spinner className="w-7 h-7" />
          ) : (
            <p>
              {isUsernameValid ? (
                <Check className="w-6 h-6" />
              ) : (
                <Close className="w-6 h-6" />
              )}
            </p>
          )}
        </div>
        <div className="flex flex-col items-center w-full  gap-4 mt-10">
          <label htmlFor="description" className="ubuntu-bold">
            Descripcion
          </label>
          <textarea
            name="description"
            id="description"
            rows={6}
            className="border w-full border-[#47D1AF]/50 bg-[#47D1AF]/20 rounded-lg px-2 py-1"
            value={description}
            onChange={handleDescriptionChange}
          ></textarea>
        </div>
        {submitMessage && (
          <p className="bg-blue-500/70 border border-blue-800/60 px-5 py-3 mt-5 rounded-lg  text-lg text-white">
            {submitMessage}
          </p>
        )}
        <button
          className="bg-[#47d1af] w-fit px-4 py-2 text-lg rounded-lg cursor-pointer ubuntu-medium mt-5 disabled:opacity-50 disabled:cursor-not-allowed"
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Guardando..." : "Enviar"}
        </button>
      </form>
    </section>
  );
};

export default ProfileEditPage;
