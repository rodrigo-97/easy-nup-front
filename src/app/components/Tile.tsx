import { IconBaseProps } from "react-icons";
import { useNavigate } from "react-router-dom";
import { AppPages } from "../../config/AppPages";

type Props = {
  title: string;
  icon: React.ElementType<IconBaseProps>;
  route?: AppPages | string;
  onClick?: () => void;
};

export function Tile({ title, icon: Icon, route, onClick }: Props) {
  const navigate = useNavigate();

  function handleClick() {
    if (route) {
      return navigate(route);
    }

    if (onClick) {
      onClick();
    }
  }

  return (
    <div className="tile d-flex align-items-center gap-3" onClick={handleClick}>
      <Icon size={20} />
      {title}
    </div>
  );
}
