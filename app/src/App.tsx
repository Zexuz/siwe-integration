import { Profile } from "./components/Profile";
import { SignIn } from "./components/SignIn";
import { Container } from "./components/Container";
import { UpdateProfile } from "./components/UpdateProfile";
import { useUserStore } from "./store/userStore.ts";

function App() {
  const token = useUserStore((state) => state.token);

  return (
    <>
      <Container>
        {!token && <SignIn />}
        {token && (
          <>
            <Profile />
            <div className="h-16" />
            <UpdateProfile />
          </>
        )}
      </Container>
    </>
  );
}

export default App;
