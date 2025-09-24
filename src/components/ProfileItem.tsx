import type { PropsWithChildren } from "react";

interface Props {
  name: string;
  number: string;
}

const ProfileItem: React.FC<PropsWithChildren<Props>> = ({
  name,
  number,
  children,
}) => {
  return (
    <div className=" w-full gap-2 rounded-xl border border-black/10 py-5  px-10 flex flex-col items-center">
      {children}
      <p className="ubuntu-bold text-2xl">{number}</p>
      <p className="text-sm text-gray-500">{name}</p>
    </div>
  );
};

export default ProfileItem;
