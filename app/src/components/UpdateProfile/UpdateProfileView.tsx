import { Input } from "../Input";
import { Button } from "../Button";
import { Title } from "../Title";

interface ProfileViewProps {
  username: string;
  bio: string;
  id: string;
  onUsernameChange: (userName: string) => void;
  onBioChange: (bio: string) => void;
  onSubmit: () => void;
}

export const UpdateProfileView = ({
  username,
  bio,
  onUsernameChange,
  onBioChange,
  onSubmit,
}: ProfileViewProps) => {
  return (
    <>
      <div className="flex flex-col items-center justify-center">
        <div className="mb-8">
          <Title>Update profile info</Title>
        </div>
        <Input
          label={"Username"}
          placeholder={"Username"}
          onChange={(e) => onUsernameChange(e.target.value)}
          initialValue={username}
        />

        <Input
          label={"Bio"}
          placeholder={"Bio"}
          onChange={(e) => onBioChange(e.target.value)}
          initialValue={bio}
        />

        <div className="mt-4">
          <Button onClick={onSubmit}>Update Profile</Button>
        </div>
      </div>
    </>
  );
};
