import { Paragraph } from "../Paragraph";
import { Title } from "../Title";

interface ProfileViewProps {
  username: string;
  bio: string;
  id: string;
}

export const ProfileView = ({ username, bio, id }: ProfileViewProps) => {
  return (
    <>
      <div className="flex justify-center items-center flex-col space-y-4">
        <Title>Profile</Title>
      </div>
      <Paragraph>Id: {id}</Paragraph>
      <Paragraph>Username: {username}</Paragraph>
      <Paragraph>Bio: {bio}</Paragraph>
    </>
  );
};
