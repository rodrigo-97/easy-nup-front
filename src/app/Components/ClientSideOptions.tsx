import { Folders, SignOut } from "phosphor-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { logout } from "../../services/Auth";
import { SideNavTile } from "./Tailwind/SideNavTile";

export function ClientSideOptions() {
  const navigate = useNavigate()
  const { setIsAuthenticated } = useAuth()

  function handleRedirectToAnotherRoute({ route }: { route: string }) {
    navigate(route);
  }

  async function handleLogout() {
    await logout();
    localStorage.removeItem("APP_TOKEN");
    setIsAuthenticated(false);
    navigate("/");
  }


  return (
    <>
      <SideNavTile
        onClick={() => handleRedirectToAnotherRoute({ route: "contracts" })}
      >
        <Folders weight="fill" size={20} className="mr-5" />
        Contratualizações
      </SideNavTile>
      <SideNavTile
        className="absolute bottom-6 w-56"
        onClick={handleLogout}
      >
        <SignOut weight="bold" size={20} className="mr-5" />
        Sair
      </SideNavTile>
    </>
  )
}