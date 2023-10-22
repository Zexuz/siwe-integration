import { Button } from "../Button";

interface ProfileViewProps {
  logout: () => void;
}

export const LogoutView = ({ logout }: ProfileViewProps) => {
  return (
    <>
      <div
        className={"flex flex-col items-center justify-center w-full space-y-8"}
      >
        <Button onClick={logout}>Logout</Button>
      </div>
    </>
  );
};
