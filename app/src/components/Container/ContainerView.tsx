import { ReactNode } from "react";
import { Paragraph } from "../Paragraph";

interface ContainerProps {
  children: ReactNode;
}

export const ContainerView = ({ children }: ContainerProps) => {
  return (
    <>
      <div className="flex min-h-screen flex-col bg-blue-600">
        <Header />
        <div className="flex-grow" />
        <div className="mx-auto flex w-1/3 flex-col items-center space-y-8 py-2">
          <main className="w-full">{children}</main>
        </div>
        <div className="flex-grow" />
        <Footer />
      </div>
    </>
  );
};

const baseClasses = "flex w-full items-center justify-center bg-blue-500 p-4";
const Header = () => {
  return (
    <header className={baseClasses}>
      <h1 className="text-lg font-medium text-gray-100">
        SignIn with Ethereum
      </h1>
    </header>
  );
};
const Footer = () => {
  return (
    <footer className={baseClasses}>
      <Paragraph>Made with love ❤️</Paragraph>
      <a
        href="https://github.com/zexuz/"
        className="pl-1 hover:underline"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Paragraph>@Zexuz</Paragraph>
      </a>
    </footer>
  );
};
