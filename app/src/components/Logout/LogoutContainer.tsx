import { useUserStore } from "../../store/userStore.ts";
import { LogoutView } from "./LogoutView.tsx";

export const LogoutContainer = () => {
  const setToken = useUserStore((state) => state.setToken);
  const onLogout = async () => {
    setToken("");
  };

  return <LogoutView logout={onLogout} />;
};
