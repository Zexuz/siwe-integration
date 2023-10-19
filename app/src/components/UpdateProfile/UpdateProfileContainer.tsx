import { useUserStore } from "../../store/userStore.ts";
import { useEffect, useState } from "react";
import { UpdateProfileView } from "./UpdateProfileView.tsx";

export const UpdateProfileContainer = () => {
  const [newUsername, setNewUsername] = useState("");
  const [newBio, setNewBio] = useState("");

  const update = useUserStore((state) => state.update);
  const { username, id, bio } = useUserStore((state) => state.userInfo);

  const onSubmit = async () => {
    update({
      bio: newBio,
      username: newUsername,
    });
  };

  useEffect(() => {
    setNewBio(bio);
    setNewUsername(username);
  }, []);

  return (
    <UpdateProfileView
      id={id}
      username={newUsername}
      bio={newBio}
      onUsernameChange={setNewUsername}
      onBioChange={setNewBio}
      onSubmit={onSubmit}
    />
  );
};
