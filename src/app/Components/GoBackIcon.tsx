import { TiChevronLeft } from "react-icons/ti";
import { useNavigate } from "react-router-dom";

type Props = {
  text: string;
};

export function GoBack({ text }: Props) {
  const navigate = useNavigate();

  return (
    <div className="flex items-center gap-3">
      <TiChevronLeft
        size={30}
        className="cursor-pointer"
        title="Voltar"
        onClick={() => navigate(-1)}
      />
      <p className="text-4xl font-bold">{text}</p>
    </div>
  );
}
