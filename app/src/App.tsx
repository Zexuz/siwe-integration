import { BrowserProvider } from "ethers";
import { SiweMessage } from "siwe";

function App() {
  return (
    <>
      <p className="m-10 text-blue-600">asdasd</p>
      <Signin />
    </>
  );
}

export const Signin = () => {
  const domain = window.location.host;
  const origin = window.location.origin;
  const provider = new BrowserProvider(window.ethereum);

  function createSiweMessage(address: string, statement: string) {
    const message = new SiweMessage({
      domain,
      address,
      statement,
      uri: origin,
      version: "1",
      chainId: 1,
      expirationTime: new Date(Date.now() * 1000 * 60 * 5).toISOString(),
    });
    return message.prepareMessage();
  }

  function connectWallet() {
    provider
      .send("eth_requestAccounts", [])
      .catch(() => console.log("user rejected request"));
  }

  async function signInWithEthereum() {
    const signer = await provider.getSigner();
    const message = createSiweMessage(
      signer.address,
      "Sign in with Ethereum to the app.",
    );

    const signature = await signer.signMessage(message);
    console.log(`hash: ${signature}`);

    const domain = "http://localhost:3000";

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: message, signature: signature }),
    };
    fetch(`${domain}/api/auth/signin`, requestOptions)
      .then((response) => response.json())
      .then((data) => console.log(data));
  }

  return (
    <>
      <Button onClick={connectWallet}>Connect Wallet</Button>
      <Button onClick={signInWithEthereum}>Sign in with Ethereum</Button>
    </>
  );
};

interface ButtonProps {
  onClick: () => void;
  children: React.ReactNode;
}

export const Button = ({ onClick, children }: ButtonProps) => {
  return (
    <button
      className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default App;
