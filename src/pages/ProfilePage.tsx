import { useEffect, useState, useRef } from "react";
import supabase from "../supabase-client.ts";
import { useParams } from "react-router";
import People from "../assets/people.svg?react";
import Pallete from "../assets/color-palette.svg?react";
import ProfileItem from "../components/ProfileItem.tsx";
import Star from "../assets/star.svg?react";
import Edit from "../assets/edit.svg?react";
import { useAuth } from "../context/AuthContext";
import { NavLink } from "react-router";

interface Profile {
  id: string;
  username: string | null;
  avatar_url: string | null;
  created_at: string;
  description: string;
}

const ProfilePage = () => {
  const [userProfile, setuserProfile] = useState<Profile | null>(null);
  const [date, setDate] = useState<string | null>(null);
  const { id } = useParams();
  const { profile } = useAuth();

  const formatingDate = (dateISO: string) => {
    const fecha = new Date(dateISO);

    const dia = fecha.getDate().toString().padStart(2, "0");
    const mes = (fecha.getMonth() + 1).toString().padStart(2, "0"); // Los meses van de 0-11
    const anio = fecha.getFullYear();

    return `${dia}--${mes}--${anio}`;
  };

  const fetchProfile = async (userId: string) => {
    const { data: profileData, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", userId)
      .single();

    if (error) {
      console.error("Error cargando profile:", error.message);
      return;
    }

    setuserProfile({ ...profileData });
    return profileData;
  };

  useEffect(() => {
    if (!id || !profile) {
      return; // Sal del useEffect si falta alguna de las dependencias clave.
    }

    if (profile?.id === id) {
      setuserProfile(profile);
    } else {
      fetchProfile(id);
    }
    setDate(formatingDate(profile.created_at));
  }, [id, profile]);

  const isOwner = profile?.id == userProfile?.id;

  return (
    <>
      {userProfile && (
        <section className="container mx-auto px-4 py-8 max-w-4xl">
          <div className="flex flex-col md:flex-row gap-6 items-start  border border-black/10  mb-10 p-6 rounded-xl">
            <div className="w-25  aspect-square overflow-hidden rounded-full ">
              <img
                src={
                  userProfile.avatar_url
                    ? userProfile.avatar_url
                    : "/usericon.png"
                }
                alt=""
                className="w-full "
              />
            </div>
            <div className="flex flex-col gap-4  ">
              <p className="ubuntu-bold text-3xl">{userProfile.username}</p>
              <p className="text-base">{userProfile.description}</p>
              <p className=" text-gray-500">Se unio {date}</p>
              {isOwner && (
                <NavLink
                  to={`/user/${profile?.id}/edit`}
                  className="hover:bg-[#3eb899] bg-[#47d1af] cursor-pointer w-fit flex items-center gap-2 px-3 py-1 rounded-lg text-white"
                >
                  <Edit className="w-5 h-5 stroke-white" />
                  <span>Editar</span>
                </NavLink>
              )}
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <ProfileItem name="People" number="5">
              <Pallete className="w-5 h-5 fill-[#47d1af] " />
            </ProfileItem>
            <ProfileItem name="Seguidores" number="5">
              <People className="w-5 h-5 fill-[#47d1af] " />
            </ProfileItem>
            <ProfileItem name="Siguiendo" number="5">
              <People className="w-5 h-5 fill-[#47d1af] " />
            </ProfileItem>
            <ProfileItem name="Siguiendo" number="5">
              <Star className="w-5 h-5 stroke-[#47d1af] " />
            </ProfileItem>
          </div>
          <div></div>
        </section>
      )}
    </>
  );
};

export default ProfilePage;
