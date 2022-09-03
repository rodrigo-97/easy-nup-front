import { TiChevronLeft } from "react-icons/ti";
import { useNavigate } from "react-router-dom";

type Props = {
  text: string;
};

export function GoBack({ text }: Props) {
  const navigate = useNavigate();

  return (
    <div className="d-flex align-items-center gap-3 mb-4">
      <TiChevronLeft
        size={30}
        className="pointer"
        title="Voltar"
        onClick={() => navigate(-1)}
      />
      <p className="h2">{text}</p>
    </div>
  );
}
