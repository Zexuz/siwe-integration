import { Button } from "../Button";

interface ProfileViewProps {
  signInWithEthereum: () => void;
}

export const SignInView = ({ signInWithEthereum }: ProfileViewProps) => {
  return (
    <>
      <div
        className={"flex flex-col items-center justify-center w-full space-y-8"}
      >
        <Button onClick={signInWithEthereum}>Sign in with Ethereum</Button>
      </div>
    </>
  );
};
