import { BrowserProvider } from "ethers";
import { useUserStore } from "../../store/userStore.ts";
import { SiweMessage } from "siwe";
import { SignInView } from "./SignInView.tsx";

export const SignInContainer = () => {
  const domain = window.location.host;
  const origin = window.location.origin;
  const provider = new BrowserProvider(window.ethereum);
  const setToken = useUserStore((state) => state.setToken);
  const refresh = useUserStore((state) => state.refresh);

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

  const onSignIn = async (token: string) => {
    setToken(token);
    await refresh();
  };

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
      .then((data) => onSignIn(data.token));
  }

  return <SignInView signInWithEthereum={signInWithEthereum} />;
};
