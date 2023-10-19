import { useUserStore } from "../../store/userStore.ts";
import { useEffect } from "react";
import { ProfileView } from "./ProfileView.tsx";

export const ProfileContainer = () => {
  const refresh = useUserStore((state) => state.refresh);
  const { username, id, bio } = useUserStore((state) => state.userInfo);

  useEffect(() => {
    const asyncFunc = async () => {
      console.log("refreshing"); // TODO: Set loading state
      await refresh();
      console.log("refreshed"); // TODO: Set loading state
    };

    asyncFunc();
  }, [refresh]);

  return <ProfileView username={username} bio={bio} id={id} />;
};
