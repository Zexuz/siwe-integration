import { BrowserProvider } from "ethers";
import { SiweMessage } from "siwe";
import { useEffect } from "react";
import { useUserStore } from "./store/userStore.ts";

function App() {
  return (
    <>
      <p className="m-10 text-blue-600">asdasd</p>
      <Signin />
      <Profile />
    </>
  );
}

export const Signin = () => {
  const domain = window.location.host;
  const origin = window.location.origin;
  const provider = new BrowserProvider(window.ethereum);
  const setToken = useUserStore((state) => state.setToken);

  function createSiweMessage(address: string, statement: string) {
    const expirationOffset = 1000 * 60 * 5;
    const currentTimestamp = Date.now();
    const expirationTime = new Date(currentTimestamp + expirationOffset);

    const message = new SiweMessage({
      domain,
      address,
      statement,
      uri: origin,
      version: "1",
      chainId: 1,
      expirationTime: expirationTime.toISOString(),
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
      .then((data) => setToken(data.token));
  }

  return (
    <>
      <Button onClick={connectWallet}>Connect Wallet</Button>
      <Button onClick={signInWithEthereum}>Sign in with Ethereum</Button>
    </>
  );
};

export const Profile = () => {
  const token = useUserStore((state) => state.token);
  const refresh = useUserStore((state) => state.refresh);
  const { username, id, bio } = useUserStore((state) => state.userInfo);
  const update = useUserStore((state) => state.update);

  useEffect(() => {
    const asyncFunc = async () => {
      console.log("refreshing"); // TODO: Set loading state
      await refresh();
      console.log("refreshed"); // TODO: Set loading state
    };

    asyncFunc();
  }, [refresh]);

  const updateProfile = async () => {
    update({
      bio: "new biao",
      username: "new usernaasdadsame",
    });
  };

  return (
    <>
      <p>Token: {token}</p>
      <p>Profile</p>
      <p>Id: {id}</p>
      <p>Username: {username}</p>
      <p>Bio: {bio}</p>
      <Button onClick={refresh}>Refresh</Button>
      <Button onClick={updateProfile}>Update</Button>
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
